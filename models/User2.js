const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
    
    },
    phoneNumber:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

});
module.exports = mongoose.model('User2',userSchema);