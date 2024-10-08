const Stock = require("../../../models/stockSchema");
const Creator = require("../../../models/creatorSchema");

module.exports.getStocks = async function (req, res, next) {
  try {
    const Stocks = await Stock.find({ creator: req.user._id });
    if (!Stocks) {
      return next(createError(404, "No creator stocks found"));
    }

    res.status(200).json(Stocks);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
