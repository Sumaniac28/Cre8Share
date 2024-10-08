const Stock = require("../models/stockSchema");
const Creator = require("../models/creatorSchema");
const Analytics = require("../models/analyticsSchema");
const User = require("../models/userSchema");
const UserPortfolio = require("../models/userPortfolioSchema");

module.exports.addStock = async function (req, res, next) {
  try {
    const creator = await Creator.findById(req.user.id);
    if (!creator) {
      return next(createError(404, "Creator not found"));
    }

    const { name, quantity } = req.body;
    const analyticsData = await Analytics.findOne({ creator: req.user._id });
    if (!analyticsData || analyticsData.stats.length === 0) {
      return next(createError(404, "Analytics data not found"));
    }

    const currData = analyticsData.stats[0];
    let currentPrice = currData.valuation / quantity;
    currentPrice = currentPrice < 50 ? 50 : currentPrice;
    let basePrice = currentPrice;

    const newStock = await Stock.create({
      name: name,
      basePrice: basePrice,
      currentPrice: currentPrice,
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
    return next(createError(500, "Internal server error"));
  }
};

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
  let totalInvestmentDeducted = 0;

  userStock.stockInfo.sort((a, b) => a.buyPrice - b.buyPrice);

  for (const info of userStock.stockInfo) {
    if (remainingQuantity <= 0) break;

    if (info.quantity <= remainingQuantity) {
      totalInvestmentDeducted += info.quantity * info.buyPrice;
      totalSellAmount += parseFloat((info.quantity * currentPrice).toFixed(2));
      remainingQuantity -= info.quantity;
      info.quantity = 0;
    } else {
      totalInvestmentDeducted += remainingQuantity * info.buyPrice;
      totalSellAmount += parseFloat(
        (remainingQuantity * currentPrice).toFixed(2)
      );
      info.quantity -= remainingQuantity;
      remainingQuantity = 0;
    }
  }

  userStock.stockInfo = userStock.stockInfo.filter((info) => info.quantity > 0);
  userPortfolio.totalInvested = parseFloat(
    (userPortfolio.totalInvested - totalInvestmentDeducted).toFixed(2)
  );

  userStock.totalQuantityPerStock -= quantity;
  userStock.investmentPerStock = parseFloat(
    (userStock.investmentPerStock - totalInvestmentDeducted).toFixed(2)
  );

  if (userStock.totalQuantityPerStock <= 0) {
    userPortfolio.totalGain -= userStock.gainPerStock;
    userPortfolio.totalProfitLossPercentage = parseFloat(
      ((userPortfolio.totalGain / userPortfolio.totalInvested) * 100).toFixed(2)
    );
    userPortfolio.stocks.splice(stockIndex, 1);
  }
  userPortfolio.totalQuantity -= quantity;
  await userPortfolio.save();
  return { totalSellAmount, userPortfolio };
}

async function updateStockPriceAndSave(
  stock,
  action,
  marketSensitivity,
  tradingVolume,
  volatility
) {
  const { basePrice, userBoughtQuantity, userSoldQuantity, currentPrice } =
    stock;

  const totalTradedQuantity = userBoughtQuantity + userSoldQuantity;
  const buyRate = (userBoughtQuantity / totalTradedQuantity || 0).toFixed(3);
  const sellRate = (userSoldQuantity / totalTradedQuantity || 0).toFixed(3);

  let priceImpact = 0;

  const intensityFactor = (
    (marketSensitivity *
      (0.1 + volatility * 0.9) *
      Math.log(1 + tradingVolume)) /
    10
  ).toFixed(3);

  if (action === "buy") {
    priceImpact = (intensityFactor * (1 + Number(buyRate))).toFixed(3);
  } else if (action === "sell") {
    priceImpact = (-intensityFactor * (1 + Number(sellRate))).toFixed(3);
  }

  let newPrice = (Number(currentPrice) + Number(priceImpact)).toFixed(3);

  if (action === "sell") {
    newPrice = Math.max((basePrice * 0.25).toFixed(3), newPrice).toFixed(3);
  } else if (action === "buy") {
    newPrice = Math.min((basePrice * 2.5).toFixed(3), newPrice).toFixed(3);
  }

  const updatedTotalTradedQuantity =
    stock.userBoughtQuantity + stock.userSoldQuantity;
  stock.buyRate = (
    stock.userBoughtQuantity / updatedTotalTradedQuantity || 0
  ).toFixed(3);
  stock.sellRate = (
    stock.userSoldQuantity / updatedTotalTradedQuantity || 0
  ).toFixed(3);

  stock.currentPrice = newPrice;

  return stock.save();
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

    if (portfolioStock.totalQuantityPerStock === 0) {
      portfolio.totalGain -= portfolioStock.gainPerStock;
      portfolioStock.gainPerStock = 0;
    }

    if (portfolio.totalInvested > 0) {
      portfolio.totalProfitLossPercentage = parseFloat(
        ((portfolio.totalGain / portfolio.totalInvested) * 100).toFixed(2)
      );
    } else {
      portfolio.totalProfitLossPercentage = 0;
    }

    if (portfolioStock.totalQuantityPerStock === 0) {
      portfolio.stocks.splice(portfolioStockIndex, 1);
    }
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
      return next(createError(404, "Stock not found"));
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
      return next(createError(400, "Insufficent funds"));
    }
    await updateCreatorEarningsAndUserFunds(
      stock.creator._id,
      userId,
      investment
    );

    // Track unique buyers
    if (!stock.uniqueBuyers.includes(userId.toString())) {
      stock.uniqueBuyers.push(userId.toString());
    }

    if (stock.totalSoldPercentage >= 20 && stock.uniqueBuyers.length >= 5) {
      await updateStockPriceAndSave(stock, "buy", 0.8, quantity, 0.3);
    }

    stock.userBoughtQuantity += quantity;
    stock.stocksAllocated += quantity;
    stock.stocksUnallocated -= quantity;

    // Calculate total sold percentage
    stock.totalSoldPercentage = (stock.stocksAllocated / stock.quantity) * 100;

    await stock.save();

    // await updateStockPriceAndSave(stock, "buy", 0.8, quantity, 0.3);

    await updateAffectedPortfolios(stockId, userId, stock);

    return res
      .status(200)
      .json({ message: "Stock bought successfully", data: userPortfolio });
  } catch (err) {
    next(createError(500, "Internal server error"));
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
      return next(createError(404, "Stock not found"));
    }

    const { totalSellAmount, userPortfolio } = await updatePortfolioForSell(
      userId,
      stockId,
      quantity,
      stock.currentPrice
    );

    await User.findByIdAndUpdate(userId, { $inc: { funds: totalSellAmount } });

    stock.userSoldQuantity += quantity;
    stock.stocksAllocated -= quantity;
    stock.stocksUnallocated += quantity;

    // Calculate total sold percentage
    stock.totalSoldPercentage = (stock.stocksAllocated / stock.quantity) * 100;

    await stock.save();

    await updateStockPriceAndSave(stock, "sell", 0.8, quantity, 0.3);

    await updateAffectedPortfolios(stockId, userId, stock);

    return res
      .status(200)
      .json({ message: "Stock sold successfully", data: userPortfolio });
  } catch (err) {
    next(createError(401, "Internal server error"));
  }
};
