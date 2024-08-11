const Stock = require("../../../models/stockSchema");
const Creator = require("../../../models/creatorSchema");

module.exports.getStocks = async function (req, res,next) {
  try {
    const Stocks = await Stock.find({ creator: req.user._id });
    if (!Stocks) {
      const erroMsg = new Error("No stocks found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }

    res.status(200).json(Stocks);
  } catch (error) {
    const erroMsg = new Error(error.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
