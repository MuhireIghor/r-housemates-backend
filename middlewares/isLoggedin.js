const express = require('express');
// const { models } = require('mongoose');
function isLoggedin(req,res,next){
    req.user?next():res.sendStatus(401);
}
module.exports = isLoggedin;