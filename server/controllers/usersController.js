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
      await User.create(req.body);
      // 
      return res.status(200).json({ message: "User created successfully" });
    }
    else{
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
  marketSensitivity
) {
  const demandSupplyRatio = parseFloat(
    (totalQuantity - unsoldQuantity) / (soldQuantity + 1)
  ); // Adding 1 to soldQuantity to avoid division by zero
  const priceAdjustmentFactor = 0.1; // Example factor, adjust as needed
  const newPrice =
    basePrice +
    parseFloat(priceAdjustmentFactor * demandSupplyRatio * marketSensitivity);
  return newPrice;
}

module.exports.buyStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const userId = req.user._id;

    const stock = await Stock.findById(stockId).populate("creator");
    const creatorID = stock.creator._id;
    let userPortfolio = await UserPortfolio.findOne({ user: userId });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    if (!userPortfolio) {
      userPortfolio = await UserPortfolio.create({
        user: userId,
        stocks: [
          {
            stock: stock._id,
            stockInfo: [
              {
                quantity: quantity,
                buyPrice: stock.currentPrice,
              },
            ],
            totalQuantityPerStock : quantity
          },
        ],
        totalQuantity: quantity,
      });
    } else {
      let stockIndex = userPortfolio.stocks.findIndex((s) =>
        s.stock.equals(stock._id)
      );

      if (stockIndex === -1) {
        userPortfolio.stocks.push({
          stock: stock._id,
          stockInfo: [
            {
              quantity: quantity,
              buyPrice: stock.currentPrice,
            },
          ],
          totalQuantityPerStock : quantity
        });
        userPortfolio.totalQuantity += quantity;
      } else {
        let totalGainPerStock = 0;
        let totalQuantityPerStock = 0;
        userPortfolio.stocks[stockIndex].stockInfo.map((info) => {
          info.gain = parseFloat(
            (stock.currentPrice - info.buyPrice) * info.quantity
          );
          totalGainPerStock += info.gain;
          totalQuantityPerStock += info.quantity;
        });
        userPortfolio.stocks[stockIndex].stockInfo.push({
          quantity: quantity,
          buyPrice: stock.currentPrice,
        });
        userPortfolio.stocks[stockIndex].gainPerStock = totalGainPerStock;
        userPortfolio.stocks[stockIndex].totalQuantityPerStock =
          totalQuantityPerStock + quantity;
      }
    }
    let totalGain = 0;
    let totalQuantity = 0;
    userPortfolio.stocks.map((stock) => {
      totalGain += stock.gainPerStock;
      totalQuantity += stock.totalQuantityPerStock;
    });

    userPortfolio.totalGain = totalGain;
    userPortfolio.totalQuantity = totalQuantity;

    await userPortfolio.save();

    // Update stock data
    const parsedQuantity = parseInt(quantity);

    Creator.findByIdAndUpdate(creatorID, {
      balance: parseFloat(stock.currentPrice * parsedQuantity),
    });
    stock.sold += parsedQuantity;
    stock.unsold -= parsedQuantity;

    const currentPrice = parseFloat(
      calculateNewPrice(
        stock.listPrice,
        stock.quantity,
        stock.sold,
        stock.unsold,
        0.5
      )
    );

    stock.currentPrice += currentPrice;

    await stock.save();

    User.findByIdAndUpdate(userId, {
      portfolio: userPortfolio._id,
    });

    //Update gain and total gain for all users who have this stock

    const affectedPortfolios = await UserPortfolio.find({
      "stocks.stock": stockId,
    });

    for (const portfolio of affectedPortfolios) {
      if(portfolio.user.equals(userId)){
        continue;
      }
      let totalGain = 0;
      let totalQuantity = 0;
      let stockIndex =portfolio.stocks.findIndex((s) =>
        s.stock.equals(stockId)
      );
      let currstock=portfolio.stocks[stockIndex];
        let stockGain = 0;
        for (const info of currstock.stockInfo) {
          const gain = (stock.currentPrice - info.buyPrice) * info.quantity;
          info.gain = gain;
          stockGain += gain;
        }
        portfolio.totalGain= portfolio.totalGain-currstock.gainPerStock;
        currstock.gainPerStock = stockGain;
        totalGain += stockGain;
      portfolio.totalGain = portfolio.totalGain + totalGain;
      await portfolio.save();
    }

    return res.status(200).json({
      message: "Stock bought successfully",
      data: userPortfolio,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      data: err,
    });
  }
};

