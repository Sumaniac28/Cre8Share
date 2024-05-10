const Stock = require("../../../models/stockSchema");
const Creator = require("../../../models/creatorSchema");

module.exports.getStocks=   async function(req,res){
    try {
      const Stocks = await Stock.find({ creator: req.user._id });
        return res.json(200, Stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;
      }
};


