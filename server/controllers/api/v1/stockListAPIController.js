const Stock = require('../../../models/stockSchema');
module.exports.getStockList = async function (req, res) {
    try{
        const stocks = await Stock.find({}).populate("creator");
        return res.status(200).json({message:"Stocks fetched successfully",data:stocks});
    }catch(err){
        return res.status(500).json({message:"Internal Server Error- Unable to fetch stocks",data:err});
    }
};