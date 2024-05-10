const Analytics = require('../../../models/analyticsSchema');

module.exports.showAnalytics= async function(req,res){
    try {
        const analyticsData = await Analytics.find({ creator: req.user._id });
        return res.json(200, analyticsData[0]);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        throw error;
      }
};