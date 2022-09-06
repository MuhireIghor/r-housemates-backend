const mongoose = require("mongoose");
const schema = mongoose.Schema;
const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"The propery name is required !"]
    },
    location:{
        type:String,
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