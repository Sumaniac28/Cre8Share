const Stock = require("../../../models/stockSchema");
module.exports.getStockList = async function (req, res, next) {
  try {
    const stocks = await Stock.find({}).populate("creator");
    if (!stocks) {
      return next(createError(404, "No stocks found"));
    }
    return res
      .status(200)
      .json({ message: "Stocks fetched successfully", data: stocks });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};
