const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,'Email is required please!'],
        match:[/\s+@+gmail+.+s+\$/,'Email is invalid']
    },
    password:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('User',userSchema);