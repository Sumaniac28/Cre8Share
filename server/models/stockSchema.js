const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    listPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0,
        required: true
    },
    unsold: {
        type: Number,
        default: function () {
            return this.quantity-this.sold; 
        },
        required: true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Creator"
    }
},{
    timestamps:true
});

// creating a model
const Stock = mongoose.model("Stock", stockSchema);

// exporting the model
module.exports = Stock;