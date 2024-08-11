const Analytics = require("../../../models/analyticsSchema");

module.exports.showAnalytics = async function (req, res, next) {
  try {
    const analyticsData = await Analytics.find({ creator: req.user._id });

    if (!analyticsData) {
      const erroMsg = new Error("No analytics data found for the user");
      erroMsg.statusCode = 404;
      return next(erroMsg);
    }
    res.status(200).json(analyticsData[0]);
  } catch (error) {
    const erroMsg = new Error(error.message);
    erroMsg.statusCode = 500;
    next(erroMsg);
  }
};
