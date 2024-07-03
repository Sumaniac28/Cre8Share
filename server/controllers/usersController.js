const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stockSchema");
const Creator = require("../models/creatorSchema");
const UserPortfolio = require("../models/userPortfolioSchema");
const socket = require("socket.io");

module.exports.signUP = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Create the user if it doesn't exist
      const user = await User.create(req.body);
      await UserPortfolio.create({ user: user._id });
      return res.status(200).json({ message: "User created successfully" });
    } else {
      return res.status(409).json({ message: "User already exists" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.signIN = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(user.toJSON(), "cre8share", { expiresIn: "1d" });

    return res
      .status(200)
      .json({ message: "Token generated successfully", token });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

function calculateNewPrice(
  basePrice,
  totalQuantity,
  soldQuantity,
  unsoldQuantity,
  marketSensitivity,
  tradingVolume,
  volatility
) {
  const demandSupplyRatio = parseFloat(
    (totalQuantity - unsoldQuantity) / (soldQuantity + 1)
  ); // Avoid division by zero

  // Dynamic price adjustment factor based on volatility and market sensitivity
  const priceAdjustmentFactor = marketSensitivity * (0.1 + volatility * 0.9);

  // Trading volume effect (the higher the volume, the more significant the price adjustment)
  const volumeEffect = Math.log(1 + tradingVolume) / 10;

  const newPrice =
    basePrice + priceAdjustmentFactor * demandSupplyRatio * volumeEffect;

  return newPrice;
}

module.exports.buyStock = async (req, res) => {
  try {
    const { id: stockId } = req.params;
    const { quantity: quantityStr } = req.body;
    const userId = req.user._id;
    const quantity = parseInt(quantityStr);

    const stock = await Stock.findById(stockId).populate("creator");
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const userPortfolio =
      (await UserPortfolio.findOne({ user: userId })) ||
      (await UserPortfolio.create({
        user: userId,
        stocks: [],
        totalQuantity: 0,
        totalInvested: 0,
        totalGain: 0,
      }));

    const currentPrice = stock.currentPrice;
    const investment = parseFloat((currentPrice * quantity).toFixed(2));

    // Check if user has enough funds
    const user = await User.findById(userId);
    if (user.funds < investment) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const stockIndex = userPortfolio.stocks.findIndex((s) =>
      s.stock.equals(stockId)
    );

    if (stockIndex === -1) {
      userPortfolio.stocks.push({
        stock: stock._id,
        stockInfo: [{ quantity, buyPrice: currentPrice }],
        totalQuantityPerStock: quantity,
        investmentPerStock: investment,
      });
    } else {
      const userStock = userPortfolio.stocks[stockIndex];
      userStock.stockInfo.push({ quantity, buyPrice: currentPrice });
      userStock.totalQuantityPerStock += quantity;
      userStock.investmentPerStock += investment;
      userStock.investmentPerStock = parseFloat(
        userStock.investmentPerStock.toFixed(2)
      );
    }

    userPortfolio.totalQuantity += quantity;
    userPortfolio.totalInvested += investment;
    userPortfolio.totalInvested = parseFloat(
      userPortfolio.totalInvested.toFixed(2)
    );
    userPortfolio.totalProfitLossPercentage = parseFloat(
      ((userPortfolio.totalGain / userPortfolio.totalInvested) * 100).toFixed(2)
    );
    await userPortfolio.save();

    // Update creator earnings and user funds
    const creatorID = stock.creator._id;
    await Creator.findByIdAndUpdate(creatorID, {
      $inc: { earnings: investment },
    });
    await User.findByIdAndUpdate(userId, { $inc: { funds: -investment } });

    // Update stock data
    stock.sold += quantity;
    stock.unsold -= quantity;
    const tradingVolume = quantity;
    const volatility = 0.2;
    const newPrice = calculateNewPrice(
      stock.listPrice,
      stock.quantity,
      stock.sold,
      stock.unsold,
      0.5,
      tradingVolume,
      volatility
    );
    stock.currentPrice += newPrice;
    stock.currentPrice = parseFloat(stock.currentPrice.toFixed(2));
    await stock.save();
    // Update gain and total gain for all users who have this stock
    const affectedPortfolios = await UserPortfolio.find({
      "stocks.stock": stockId,
    });
    for (const portfolio of affectedPortfolios) {
      const portfolioStockIndex = portfolio.stocks.findIndex((s) =>
        s.stock.equals(stockId)
      );
      if (portfolioStockIndex === -1 || portfolio.user.equals(userId)) continue;

      let totalGain = 0;
      const portfolioStock = portfolio.stocks[portfolioStockIndex];
      portfolioStock.stockInfo.forEach((info) => {
        const gain = parseFloat(
          ((stock.currentPrice - info.buyPrice) * info.quantity).toFixed(2)
        );
        totalGain += gain;
        info.gain = gain;
      });

      portfolio.totalGain += parseFloat(
        (totalGain - portfolioStock.gainPerStock).toFixed(2)
      );
      portfolioStock.gainPerStock = totalGain;
      await portfolio.save();
    }

    return res
      .status(200)
      .json({ message: "Stock bought successfully", data: userPortfolio });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", data: err });
  }
};

module.exports.sellStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const userId = req.user._id;

    const stock = await Stock.findById(stockId).populate("creator");
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const userPortfolio = await UserPortfolio.findOne({ user: userId });
    if (!userPortfolio) {
      return res.status(404).json({ message: "User portfolio not found" });
    }

    const stockIndex = userPortfolio.stocks.findIndex((s) =>
      s.stock.equals(stockId)
    );
    if (stockIndex === -1) {
      return res
        .status(400)
        .json({ message: "Stock not found in user portfolio" });
    }

    const userStock = userPortfolio.stocks[stockIndex];
    if (userStock.totalQuantityPerStock < quantity) {
      return res.status(400).json({ message: "Insufficient stock quantity" });
    }

    const currentPrice = stock.currentPrice;
    let totalSellAmount = 0;
    let remainingQuantity = quantity;

    // Sort stockInfo by buyPrice to sell the oldest ones first
    userStock.stockInfo.sort((a, b) => a.buyPrice - b.buyPrice);

    // Iterate over stockInfo to sell the specified quantity
    for (const info of userStock.stockInfo) {
      if (remainingQuantity <= 0) break;

      if (info.quantity <= remainingQuantity) {
        totalSellAmount += parseFloat(
          (info.quantity * currentPrice).toFixed(2)
        );
        remainingQuantity -= info.quantity;
        info.quantity = 0;
      } else {
        totalSellAmount += parseFloat(
          (remainingQuantity * currentPrice).toFixed(2)
        );
        info.quantity -= remainingQuantity;
        remainingQuantity = 0;
      }
    }

    // Remove stockInfo with quantity 0
    userStock.stockInfo = userStock.stockInfo.filter(
      (info) => info.quantity > 0
    );

    userPortfolio.totalInvested -= parseFloat(
      (
        (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
        quantity
      ).toFixed(2)
    );
    userStock.totalQuantityPerStock -= quantity;
    userStock.investmentPerStock -= parseFloat(
      (
        (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
        quantity
      ).toFixed(2)
    );

    // If all quantities of the stock are sold, remove the stock from the portfolio
    if (userStock.totalQuantityPerStock <= 0) {
      userPortfolio.stocks.splice(stockIndex, 1);
    }
    userPortfolio.totalQuantity -= quantity;

    await userPortfolio.save();

    // Update stock data
    stock.sold -= quantity;
    stock.unsold += quantity;
    const tradingVolume = quantity;
    const volatility = 0.2;
    const newPrice = calculateNewPrice(
      stock.listPrice,
      stock.quantity,
      stock.sold,
      stock.unsold,
      0.5,
      tradingVolume,
      volatility
    );
    stock.currentPrice -= newPrice;
    stock.currentPrice = parseFloat(stock.currentPrice.toFixed(2));
    await stock.save();

    // Update user funds
    await User.findByIdAndUpdate(userId, { $inc: { funds: totalSellAmount } });

    // Update gain and total gain for all users who have this stock
    const affectedPortfolios = await UserPortfolio.find({
      "stocks.stock": stockId,
    });
    for (const portfolio of affectedPortfolios) {
      if (portfolio.user.equals(userId)) {
        continue;
      }
      const portfolioStockIndex = portfolio.stocks.findIndex((s) =>
        s.stock.equals(stockId)
      );
      if (portfolioStockIndex === -1 || portfolio.user.equals(userId)) continue;

      let totalGain = 0;
      const portfolioStock = portfolio.stocks[portfolioStockIndex];
      portfolioStock.stockInfo.forEach((info) => {
        const gain = parseFloat(
          ((stock.currentPrice - info.buyPrice) * info.quantity).toFixed(2)
        );
        totalGain += gain;
        info.gain = gain;
      });

      portfolio.totalGain += parseFloat(
        (totalGain - portfolioStock.gainPerStock).toFixed(2)
      );
      portfolioStock.gainPerStock = totalGain;
      await portfolio.save();
    }

    return res
      .status(200)
      .json({ message: "Stock sold successfully", data: userPortfolio });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", data: err });
  }
};
