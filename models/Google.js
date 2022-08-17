const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const googleSchema = new Schema({
    username:String,
    googleId:String,
    
});
module.exports = mongoose.model('Google',googleSchema);
