const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const refreshTokenHandler = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.refreshToken){
        return res.status(401).json({message:"Unauthorised!"})
    }
    const refreshToken = cookies.refreshToken;
    const foundeUser = await User.findOne({refreshToken});
    if(!foundeUser) return res.status(401);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundeUser.fullName !== decoded.fullName){
                return res.status(403).json({message:"unauthorised!"})
            }
            const accessToken = jwt.sign({
                "fullName":foundeUser.fullName,
                "email":foundeUser.email,
            
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'45s'})
        },
        res.json({accessToken})

    )
}
module.exports = refreshTokenHandler;