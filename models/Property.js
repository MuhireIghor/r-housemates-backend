const mongoose = require("mongoose");
const schema = mongoose.Schema;
const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"The propery name is required !"]
    },
    Bedroom:{
        type:Number,
        required:true
    },
    Sittingroom:{
        type:Number,
        required:true,
    },
    kitchen:{
        type:Number,
        required:true
    },
    noPerson:{
        type:Number,
        required:true
    },
    noFemale:{
        type:Number,
        required:true
    },
    noMale:{
        type:Number,
        required:true
    },
    option:{
        type:String,
        required:true,
        enum:["sale","rent","housemate"]
    },
    likeCount:{
        type:Number,
        default:0
    }
})
module.exports = mongoose.model('Property',propertySchema);