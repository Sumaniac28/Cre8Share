const Stock = require("../models/stockSchema");
const Creator = require("../models/creatorSchema");
const Analytics = require("../models/analyticsSchema");

module.exports.addStock = async function (req, res) {
  try {
    const creator = await Creator.findById(req.user.id);
    if (!creator) {
      return res.status(400).json({ message: "Creator not found" });
    }
    const { name, quantity } = req.body;
    const analyticsData = await Analytics.find({ creator: req.user._id });
    const currData = analyticsData[0];
    let currentPrice = currData.stats[0].valuation / quantity;
    currentPrice = currentPrice<50?50:currentPrice;
    let basePrice = currentPrice;

    const newStock = await Stock.create({
      name: name,
      currentPrice: currentPrice,
      listPrice: basePrice,
      quantity: quantity,
      creator: creator._id,
    });

    await Creator.findByIdAndUpdate(
      req.user.id,
      {
        $push: { stocks: newStock._id },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Stock added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: err });
  }
};
