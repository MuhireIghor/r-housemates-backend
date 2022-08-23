const mongoose = require('mongoose');
const express = require('express');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:String,
    googleId:String,
    email:String
    
});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User',userSchema);
