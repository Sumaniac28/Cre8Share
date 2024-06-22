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

  console.log(demandSupplyRatio);

  // Dynamic price adjustment factor based on volatility and market sensitivity
  const priceAdjustmentFactor = marketSensitivity * (0.1 + volatility * 0.9);

  console.log(priceAdjustmentFactor);

  // Trading volume effect (the higher the volume, the more significant the price adjustment)
  const volumeEffect = Math.log(1 + tradingVolume) / 10;

  console.log(volumeEffect);

  const newPrice =
    basePrice + priceAdjustmentFactor * demandSupplyRatio * volumeEffect;

  return newPrice;
}

// module.exports.buyStock = async (req, res) => {
//   try {
//     const stockId = req.params.id;
//     const quantity = parseInt(req.body.quantity);
//     const userId = req.user._id;

//     const stock = await Stock.findById(stockId).populate("creator");
//     const creatorID = stock.creator._id;
//     let userPortfolio = await UserPortfolio.findOne({ user: userId });

//     if (!stock) {
//       return res.status(404).json({
//         message: "Stock not found",
//       });
//     }

//     const currentPrice = stock.currentPrice;

//     if (!userPortfolio) {
//       userPortfolio = await UserPortfolio.create({
//         user: userId,
//         stocks: [
//           {
//             stock: stock._id,
//             stockInfo: [
//               {
//                 quantity: quantity,
//                 buyPrice: currentPrice,
//               },
//             ],
//             totalQuantityPerStock: quantity,
//             investmentPerStock: parseFloat(currentPrice * quantity),
//           },
//         ],
//         totalQuantity: quantity,
//         totalInvested: parseFloat(currentPrice * quantity),
//       });
//     } else {
//       let stockIndex = userPortfolio.stocks.findIndex((s) =>
//         s.stock.equals(stock._id)
//       );

//       if (stockIndex === -1) {
//         userPortfolio.stocks.push({
//           stock: stock._id,
//           stockInfo: [
//             {
//               quantity: quantity,
//               buyPrice: currentPrice,
//             },
//           ],
//           totalQuantityPerStock: quantity,
//           investmentPerStock: parseFloat(currentPrice * quantity),
//         });
//         userPortfolio.totalQuantity += quantity;
//         userPortfolio.totalInvested = parseFloat(
//           userPortfolio.totalInvested + currentPrice * quantity
//         );
//       } else {
//         // let totalGainPerStock = 0;
//         // let totalQuantityPerStock = 0;
//         // let totalInvestedPerStock = 0;
//         // userPortfolio.stocks[stockIndex].stockInfo.map((info) => {
//         //   info.gain = parseFloat(
//         //     (currentPrice - info.buyPrice) * info.quantity
//         //   );
//         //   totalGainPerStock += info.gain;
//         //   totalQuantityPerStock += info.quantity;
//         //   totalInvestedPerStock += info.buyPrice * info.quantity;
//         // });
//         userPortfolio.stocks[stockIndex].stockInfo.push({
//           quantity: quantity,
//           buyPrice: currentPrice,
//         });
//         // userPortfolio.stocks[stockIndex].gainPerStock = totalGainPerStock;
//         userPortfolio.stocks[stockIndex].totalQuantityPerStock += quantity;
//         userPortfolio.stocks[stockIndex].investmentPerStock += (currentPrice * quantity);
//       }
//     }
//     let totalGain = 0;
//     let totalQuantity = 0;
//     let totalInvested = 0;
//     userPortfolio.stocks.map((stock) => {
//       totalGain += stock.gainPerStock;
//       totalQuantity += stock.totalQuantityPerStock;
//       totalInvested += stock.investmentPerStock;
//     });

//     userPortfolio.totalGain += totalGain;
//     userPortfolio.totalQuantity = totalQuantity;
//     userPortfolio.totalInvested = totalInvested;

//     await userPortfolio.save();

//     // Update stock data
//     const parsedQuantity = parseInt(quantity);

//     Creator.findByIdAndUpdate(creatorID, {
//       earnings: parseFloat(currentPrice * parsedQuantity),
//     });

//     User.findByIdAndUpdate(userId, {
//       funds: parseFloat(req.user.funds - currentPrice * parsedQuantity),
//     });

//     stock.sold += parsedQuantity;
//     stock.unsold -= parsedQuantity;

//     const newPrice = parseFloat(
//       calculateNewPrice(
//         stock.listPrice,
//         stock.quantity,
//         stock.sold,
//         stock.unsold,
//         0.5
//       )
//     );

//     stock.currentPrice += newPrice;

//     await stock.save();

//     User.findByIdAndUpdate(userId, {
//       portfolio: userPortfolio._id,
//       funds: parseFloat(req.user.funds - currentPrice * parsedQuantity),
//     });

//     //Update gain and total gain for all users who have this stock

//     const affectedPortfolios = await UserPortfolio.find({
//       "stocks.stock": stockId,
//     });

//     for (const portfolio of affectedPortfolios) {
//       if (portfolio.user.equals(userId)) {
//         continue;
//       }
//       let totalGain = 0;
//       let stockIndex = portfolio.stocks.findIndex((s) =>
//         s.stock.equals(stockId)
//       );
//       let currstock = portfolio.stocks[stockIndex];
//       let stockGain = 0;
//       for (const info of currstock.stockInfo) {
//         const gain = (stock.currentPrice - info.buyPrice) * info.quantity;
//         info.gain = gain;
//         stockGain += gain;
//       }
//       portfolio.totalGain = portfolio.totalGain - currstock.gainPerStock;
//       currstock.gainPerStock = stockGain;
//       totalGain += stockGain;
//       portfolio.totalGain = portfolio.totalGain + totalGain;
//       await portfolio.save();
//     }

//     return res.status(200).json({
//       message: "Stock bought successfully",
//       data: userPortfolio,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal server error",
//       data: err,
//     });
//   }
// };

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
    const investment = parseFloat(currentPrice * quantity);
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
    }

    userPortfolio.totalQuantity += quantity;
    userPortfolio.totalInvested += investment;
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
    console.log(newPrice);
    stock.currentPrice += newPrice;
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
        const gain = (stock.currentPrice - info.buyPrice) * info.quantity;
        totalGain += gain;
        info.gain = gain;
      });

      portfolio.totalGain += totalGain - portfolioStock.gainPerStock;
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

// module.exports.sellStock = async (req, res) => {
//   try {
//     const stockId = req.params.id;
//     const quantity = parseInt(req.body.quantity);
//     const userId = req.user._id;

//     const stock = await Stock.findById(stockId).populate("creator");
//     const creatorID = stock.creator._id;
//     let userPortfolio = await UserPortfolio.findOne({ user: userId });

//     if (!stock) {
//       return res.status(404).json({
//         message: "Stock not found",
//       });
//     }

//     const currentPrice = stock.currentPrice;

//     if (!userPortfolio) {
//       return res.status(404).json({
//         message: "User portfolio not found",
//       });
//     } else {
//       let stockIndex = userPortfolio.stocks.findIndex((s) =>
//         s.stock.equals(stock._id)
//       );

//       if (stockIndex === -1) {
//         return res.status(404).json({
//           message: "Stock not found in user portfolio",
//         });
//       } else {
//         let totalGainPerStock = 0;
//         let totalQuantityPerStock = 0;
//         let totalInvestedPerStock = 0;
//         let stockInfoIndex = userPortfolio.stocks[
//           stockIndex
//         ].stockInfo.findIndex((info) => info.quantity >= quantity);

//         if (stockInfoIndex === -1) {
//           return res.status(400).json({
//             message: "Insufficient quantity",
//           });
//         }

//         userPortfolio.stocks[stockIndex].stockInfo.map((info) => {
//           info.gain = parseFloat(
//             (currentPrice - info.buyPrice) * info.quantity
//           );
//           totalGainPerStock += info.gain;
//           totalQuantityPerStock += info.quantity;
//           totalInvestedPerStock += info.buyPrice * info.quantity;
//         });

//         userPortfolio.stocks[stockIndex].stockInfo[stockInfoIndex].quantity -=
//           quantity;
//         userPortfolio.stocks[stockIndex].stockInfo[stockInfoIndex].gain =
//           parseFloat(
//             (currentPrice -
//               userPortfolio.stocks[stockIndex].stockInfo[stockInfoIndex]
//                 .buyPrice) *
//               quantity
//           );
//         userPortfolio.stocks[stockIndex].gainPerStock = totalGainPerStock;
//         userPortfolio.stocks[stockIndex].totalQuantityPerStock =
//           totalQuantityPerStock - quantity;
//         userPortfolio.stocks[stockIndex].investmentPerStock =
//           totalInvestedPerStock - currentPrice * quantity;
//       }
//     }

//     let totalGain = 0;
//     let totalQuantity = 0;
//     let totalInvested = 0;
//     userPortfolio.stocks.map((stock) => {
//       totalGain += stock.gainPerStock;
//       totalQuantity += stock.totalQuantityPerStock;
//       totalInvested += stock.investmentPerStock;
//     });

//     userPortfolio.totalGain = totalGain;
//     userPortfolio.totalQuantity = totalQuantity;
//     userPortfolio.totalInvested = totalInvested;

//     await userPortfolio.save();

//     // Update stock data
//     const parsedQuantity = parseInt(quantity);

//     Creator.findByIdAndUpdate(creatorID, {
//       earnings: parseFloat(currentPrice * parsedQuantity),
//     });
//     stock.sold -= parsedQuantity;
//     stock.unsold += parsedQuantity;

//     const newPrice = parseFloat(
//       calculateNewPrice(
//         stock.listPrice,
//         stock.quantity,
//         stock.sold,
//         stock.unsold,
//         0.5
//       )
//     );

//     stock.currentPrice -= newPrice;

//     await stock.save();

//     //Update gain and total gain for all users who have this stock

//     const affectedPortfolios = await UserPortfolio.find({
//       "stocks.stock": stockId,
//     });

//     for (const portfolio of affectedPortfolios) {
//       if (portfolio.user.equals(userId)) {
//         continue;
//       }
//       let totalGain = 0;
//       let stockIndex = portfolio.stocks.findIndex((s) =>
//         s.stock.equals(stockId)
//       );
//       let currstock = portfolio.stocks[stockIndex];
//       let stockGain = 0;
//       for (const info of currstock.stockInfo) {
//         const gain = (stock.currentPrice - info.buyPrice) * info.quantity;
//         info.gain = gain;
//         stockGain += gain;
//       }
//       portfolio.totalGain = portfolio.totalGain - currstock.gainPerStock;
//       currstock.gainPerStock = stockGain;
//       totalGain += stockGain;
//       portfolio.totalGain = portfolio.totalGain + totalGain;
//       await portfolio.save();
//     }

//     return res.status(200).json({
//       message: "Stock sold successfully",
//       data: userPortfolio,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal server error",
//       data: err,
//     });
//   }
// };

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
        totalSellAmount += info.quantity * currentPrice;
        remainingQuantity -= info.quantity;
        info.quantity = 0;
      } else {
        totalSellAmount += remainingQuantity * currentPrice;
        info.quantity -= remainingQuantity;
        remainingQuantity = 0;
      }
    }

    // Remove stockInfo with quantity 0
    userStock.stockInfo = userStock.stockInfo.filter(
      (info) => info.quantity > 0
    );

    userPortfolio.totalInvested -=
      (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
      quantity;
    userStock.totalQuantityPerStock -= quantity;
    userStock.investmentPerStock -=
      (userStock.investmentPerStock / userStock.totalQuantityPerStock) *
      quantity;

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
        const gain = (stock.currentPrice - info.buyPrice) * info.quantity;
        totalGain += gain;
        info.gain = gain;
      });

      portfolio.totalGain += totalGain - portfolioStock.gainPerStock;
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
