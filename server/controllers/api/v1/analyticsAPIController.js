const Analytics = require("../../../models/analyticsSchema");

module.exports.showAnalytics = async function (req, res, next) {
  try {
    const analyticsData = await Analytics.find({ creator: req.user._id });

    if (!analyticsData) {
      return next(createError(404, "No analytics data found for creator"));
    }
    res.status(200).json(analyticsData[0]);
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};
