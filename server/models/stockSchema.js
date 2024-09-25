const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    stocksAllocated: {
      type: Number,
      default: 0,
      required: true,
    },
    stocksUnallocated: {
      type: Number,
      default: function () {
        return this.quantity - this.stocksAllocated;
      },
      required: true,
    },
    userBoughtQuantity: {
      type: Number,
      default: 0,
    },
    userSoldQuantity: {
      type: Number,
      default: 0,
    },
    buyRate: {
      type: Number,
      default: 0,
    },
    sellRate: {
      type: Number,
      default: 0,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
    },
    uniqueBuyers: {
      type: [String],
      default: [],
    },
    totalSoldPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// creating a model
const Stock = mongoose.model("Stock", stockSchema);

// exporting the model
module.exports = Stock;
