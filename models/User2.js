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
        required:[true,'Email is required please!'],
        // match:[/s+@+gmail+.+s+/,'Email is invalid']
    },
    roles:{
        user:Number,
        admin:{
            type:Number,
            default:2
        }
    }
});
module.exports = mongoose.model('User2',userSchema);