const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentSchema = new Schema({
    FullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Agent',agentSchema);
