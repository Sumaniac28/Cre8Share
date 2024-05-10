const mongoose= require('mongoose');

const creatorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    channelName:{
        type:String,
        required:true
    },
    channelImage:{ 
        type:String,
        default:"https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
    },
    channelID:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
        required:true
    },
    stocks:[
        {
            stock:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Stock"
            },
        }
    ],
    balance:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

// creating a model
const Creator = mongoose.model("Creator",creatorSchema);

// exporting the model
module.exports = Creator;