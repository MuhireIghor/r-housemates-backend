const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"The propery name is required !"]
    },
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports = mongoose.model('Address',propertySchema);