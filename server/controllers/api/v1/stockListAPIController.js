const Stock = require("../../../models/stockSchema");
module.exports.getStockList = async function (req, res,next) {
  try {
    const stocks = await Stock.find({}).populate("creator");
    if (!stocks) {
      const erroMsg = new Error("No stocks found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }
    return res
      .status(200)
      .json({ message: "Stocks fetched successfully", data: stocks });
  } catch (err) {
    const erroMsg = new Error(err.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
