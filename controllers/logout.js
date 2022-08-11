const exepress= require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleLogOut = async(req,res,next)=>{
    const cookies = req.cookie;
    if(!cookies?.refreshToken) return res.status(403).json({message:'Unauthorised'});
    const refreshToken = cookies.refreshToken;
    const foundeUser = await User.findOne({refreshToken}).exec();
    if(!foundeUser) {
        res.clearCookie('refreshToken',{httpOnly:true,maxAge:24*60*60*1000})
         return res.status(204)
    }
    foundeUser.refreshToken = '';
    const result = await foundeUser.save();
    res.clearCookie('refreshToken',{httpOnly:true,maxAge:24*60*60*1000})
}
module.exports = {handleLogOut}