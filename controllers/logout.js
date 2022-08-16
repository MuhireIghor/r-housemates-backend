const exepress= require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleLogOut = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.refreshToken) return res.status(403).json({message:'Unauthorised'});
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken);
    const foundeUser = await User.findOne({refreshToken}).exec();
    if(!foundeUser) {
        res.clearCookie('refreshToken',{httpOnly:true,maxAge:24*60*60*1000})
         return res.status(204)
    }
    foundeUser.refreshToken = '';
    const result = await foundeUser.save();
    console.log(result);
    res.clearCookie('refreshToken',{httpOnly:true,maxAge:24*60*60*1000}).status(204)
}
module.exports = {handleLogOut}