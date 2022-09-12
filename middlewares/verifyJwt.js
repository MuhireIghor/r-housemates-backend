const jwt = require('jsonwebtoken');
const express = require('express')
const createError = require('../config/error');
const verifyJwt = (req, res, next) => {
    const authHeaders = req.headers.authorization;
  
    if (!authHeaders?.startsWith('Bearer ')) return res.status(401).json({message:"No authorization token"});
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.status(403).json({message:"Invalid token"});
            req.user = user;
            
            return next();
        }
    )
}
const verifyAgent = (req,res,next)=>{
    const agentToken = req.cookies.agentToken;
    if(!agentToken) return res.status(404).json({message:'Agent not found!!'});
    jwt.verify(agentToken,process.env.TOKEN,(err,agent)=>{
        if(err) return res.status(403);
        req.agent = agent;
        return next()

    })
}
const verifyAdmin = (req,res,next) => {
    verifyJwt(req,res,() => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(401, "User unauthorised"));
            console.log(req.user.isAdmin);
        }
    })
}
module.exports = { verifyJwt, verifyAdmin, verifyAgent };