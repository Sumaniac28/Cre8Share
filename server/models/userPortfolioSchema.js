const mongoose = require("mongoose");

// creating portfolio schema
const userPortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stocks: [
      {
        stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stock",
        },
        stockInfo: [
          {
            quantity: {
              type: Number,
              required: true,
              default: 0,
            },
            buyPrice: {
              type: Number,
              required: true,
              default: 0,
            },
            gain: {
              type: Number,
              default: 0,
            },
          },
        ],
        gainPerStock: {
          type: Number,
          default: 0,
        },
        totalQuantityPerStock: {
          type: Number,
          default: 0,
        },
        investmentPerStock: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalGain: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalInvested: {
      type: Number,
      default: 0,
    },
    totalProfitLossPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// creating a model
const UserPortfolio = mongoose.model("UserPortfolio", userPortfolioSchema);

// exporting the model
module.exports = UserPortfolio;
