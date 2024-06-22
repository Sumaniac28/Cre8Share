const User = require("../../../models/userSchema");
const Portfolio = require("../../../models/userPortfolioSchema");

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-_id -password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPortfolio = async (req, res) => {
  try{
    const portfolio = await Portfolio.findOne({ user: req.user.id }).populate("stocks.stock");
    if(!portfolio){
      return res.status(200).json({ data: "Portfolio not exists" });
    }
    return res.status(200).json(portfolio);
  }catch(err){
    console.error("Error retrieving portfolio data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
