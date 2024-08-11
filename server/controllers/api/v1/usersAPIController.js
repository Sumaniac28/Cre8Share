const User = require("../../../models/userSchema");
const Portfolio = require("../../../models/userPortfolioSchema");

exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-_id -password");
    if (!user) {
      const erroMsg = new Error("No user data found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }
    return res.status(200).json(user);
  } catch (error) {
    const erroMsg = new Error(error.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id }).populate(
      "stocks.stock"
    );
    if (!portfolio) {
      const erroMsg = new Error("No portfolio data found");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }
    return res.status(200).json(portfolio);
  } catch (err) {
    const erroMsg = new Error(err.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
