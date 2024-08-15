const Stock = require("../models/stockSchema");
const Creator = require("../models/creatorSchema");
const Analytics = require("../models/analyticsSchema");
const User = require("../models/userSchema");
const UserPortfolio = require("../models/userPortfolioSchema");

module.exports.addStock = async function (req, res, next) {
  try {
    const creator = await Creator.findById(req.user.id);
    if (!creator) {
      const erroMsg = new Error("Creator not found");
      erroMsg.statusCode = 400;
      return next(erroMsg);
    }

    const { name, quantity } = req.body;
    const analyticsData = await Analytics.findOne({ creator: req.user._id });
    if (!analyticsData || analyticsData.stats.length === 0) {
      const erroMsg = new Error("Analytics data not found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }

    const currData = analyticsData.stats[0];
    let currentPrice = currData.valuation / quantity;
    currentPrice = currentPrice < 50 ? 50 : currentPrice;
    let basePrice = currentPrice;

    const newStock = await Stock.create({
      name: name,
      currentPrice: currentPrice,
      listPrice: basePrice,
      quantity: quantity,
      creator: creator._id,
    });

    await Creator.findByIdAndUpdate(
      req.user.id,
      {
        $push: { stocks: newStock._id },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Stock added successfully", stock: newStock });
  } catch (err) {
    const erroMsg = new Error("Internal Server Error");
    erroMsg.statusCode = 500;
    next(erroMsg);
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
  ); 

  const priceAdjustmentFactor = marketSensitivity * (0.1 + volatility * 0.9);
  const volumeEffect = Math.log(1 + tradingVolume) / 10;
  const newPrice =
    basePrice + priceAdjustmentFactor * demandSupplyRatio * volumeEffect;

  return newPrice;
}

async function updatePortfolioForBuy(userId, stockId, quantity, currentPrice) {
  const investment = parseFloat((currentPrice * quantity).toFixed(2));
  const userPortfolio =
    (await UserPortfolio.findOne({ user: userId })) ||
    (await UserPortfolio.create({
      user: userId,
      stocks: [],
      totalQuantity: 0,
      totalInvested: 0,
      totalGain: 0,
    }));

  const stockIndex = userPortfolio.stocks.findIndex((s) =>
    s.stock.equals(stockId)
  );
  if (stockIndex === -1) {
    userPortfolio.stocks.push({
      stock: stockId,
      stockInfo: [{ quantity, buyPrice: currentPrice }],
      totalQuantityPerStock: quantity,
      investmentPerStock: investment,
    });
  } else {
    const userStock = userPortfolio.stocks[stockIndex];
    userStock.stockInfo.push({ quantity, buyPrice: currentPrice });
    userStock.totalQuantityPerStock += quantity;
    userStock.investmentPerStock = parseFloat(
      (userStock.investmentPerStock + investment).toFixed(2)
    );
  }

  userPortfolio.totalQuantity += quantity;
  userPortfolio.totalInvested = parseFloat(
    (userPortfolio.totalInvested + investment).toFixed(2)
  );
  userPortfolio.totalProfitLossPercentage = parseFloat(
    ((userPortfolio.totalGain / userPortfolio.totalInvested) * 100).toFixed(2)
  );

  await userPortfolio.save();
  return { investment, userPortfolio };
}

async function updatePortfolioForSell(userId, stockId, quantity, currentPrice) {
  const userPortfolio = await UserPortfolio.findOne({ user: userId });
  const stockIndex = userPortfolio.stocks.findIndex((s) =>
    s.stock.equals(stockId)
  );
  const userStock = userPortfolio.stocks[stockIndex];

  let totalSellAmount = 0;
  let remainingQuantity = quantity;

  userStock.stockInfo.sort((a, b) => a.buyPrice - b.buyPrice);

  for (const info of userStock.stockInfo) {
    if (remainingQuantity <= 0) break;

    if (info.quantity <= remainingQuantity) {
      totalSellAmount += parseFloat((info.quantity * currentPrice).toFixed(2));
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

  userStock.stockInfo = userStock.stockInfo.filter((info) => info.quantity > 0);
  userPortfolio.totalInvested = parseFloat(
    (
      userPortfolio.totalInvested -
      (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
        quantity
    ).toFixed(2)
  );
  userStock.totalQuantityPerStock -= quantity;
  userStock.investmentPerStock = parseFloat(
    (
      userStock.investmentPerStock -
      (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
        quantity
    ).toFixed(2)
  );

  if (userStock.totalQuantityPerStock <= 0) {
    userPortfolio.stocks.splice(stockIndex, 1);
  }

  userPortfolio.totalQuantity -= quantity;
  await userPortfolio.save();
  return { totalSellAmount, userPortfolio };
}

async function updateStockPriceAndSave(
  stock,
  tradingVolume,
  volatility,
  quantity
) {
  if (stock.totalSoldPercentage >= 20 && stock.uniqueBuyers.size >= 5) {
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
  }

  await stock.save();
}

async function updateCreatorEarningsAndUserFunds(
  creatorID,
  userId,
  investment
) {
  await Creator.findByIdAndUpdate(creatorID, {
    $inc: { earnings: investment },
  });
  await User.findByIdAndUpdate(userId, { $inc: { funds: -investment } });
}

async function updateAffectedPortfolios(stockId, userId, stock) {
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
}

module.exports.buyStock = async (req, res, next) => {
  try {
    const { id: stockId } = req.params;
    const { quantity: quantityStr } = req.body;
    const userId = req.user._id;
    const quantity = parseInt(quantityStr);

    const stock = await Stock.findById(stockId).populate("creator");
    if (!stock) {
      const erroMsg = new Error("Stock not found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }

    const user = await User.findById(userId);
    const currentPrice = stock.currentPrice;
    const { investment, userPortfolio } = await updatePortfolioForBuy(
      userId,
      stockId,
      quantity,
      currentPrice
    );

    if (user.funds < investment) {
      const erroMsg = new Error("Insufficient funds");
      erroMsg.statusCode = 400;
      return next(erroMsg);
    }
    await updateCreatorEarningsAndUserFunds(
      stock.creator._id,
      userId,
      investment
    );

    stock.sold += quantity;
    stock.unsold -= quantity;

    // Track unique buyers
    if (!stock.uniqueBuyers.includes(userId.toString())) {
      stock.uniqueBuyers.push(userId.toString());
    }

    // Calculate total sold percentage
    stock.totalSoldPercentage = (stock.sold / stock.quantity) * 100;

    if (stock.totalSoldPercentage >= 20 && stock.uniqueBuyers.length >= 5) {
      await updateStockPriceAndSave(stock, quantity, 0.2, quantity);
    }

    await stock.save();
    await updateAffectedPortfolios(stockId, userId, stock);

    return res
      .status(200)
      .json({ message: "Stock bought successfully", data: userPortfolio });
  } catch (err) {
    console.error(err);
    const erroMsg = new Error("Internal server error");
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};

module.exports.sellStock = async (req, res, next) => {
  try {
    const { id: stockId } = req.params;
    const { quantity: quantityStr } = req.body;
    const userId = req.user._id;
    const quantity = parseInt(quantityStr);

    const stock = await Stock.findById(stockId).populate("creator");
    if (!stock) {
      const erroMsg = new Error("Stock not found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }

    const { totalSellAmount, userPortfolio } = await updatePortfolioForSell(
      userId,
      stockId,
      quantity,
      stock.currentPrice
    );

    await User.findByIdAndUpdate(userId, { $inc: { funds: totalSellAmount } });

    stock.sold -= quantity;
    stock.unsold += quantity;
    await updateStockPriceAndSave(stock, quantity, 0.2, quantity);

    await updateAffectedPortfolios(stockId, userId, stock);

    return res
      .status(200)
      .json({ message: "Stock sold successfully", data: userPortfolio });
  } catch (err) {
    console.error(err);
    const erroMsg = new Error("Internal server error");
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
