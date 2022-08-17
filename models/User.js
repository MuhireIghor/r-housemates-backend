const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:String,
    googleId:String,
    email:String
    
});
module.exports = mongoose.model('User',userSchema);
