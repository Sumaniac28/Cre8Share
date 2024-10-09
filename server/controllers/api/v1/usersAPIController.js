const User = require("../../../models/userSchema");
const Portfolio = require("../../../models/userPortfolioSchema");
const createError = require("http-errors");

exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-_id -password");
    if (!user) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json(user);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id })
      .populate("user")
      .populate("stocks.stock");

    if (!portfolio) {
      return next(createError(404, "Portfolio not found"));
    }
    return res.status(200).json(portfolio);
  } catch (err) {
    const erroMsg = new Error(err.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
