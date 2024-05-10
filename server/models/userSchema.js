const mongoose = require('mongoose');

// creating a schema
const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    portfolio:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserPortfolio"
    }
},{
    timestamps:true
})

// creating a model
const User = mongoose.model("User",userSchema);

// exporting the model
module.exports = User;