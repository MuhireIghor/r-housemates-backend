const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const handleNewUser = async(req,res)=>{
    const{fname,pwd,email} = req.body;
    if(!fname || !pwd || email){
        return res.sendStatus(400).json({message:"fullName,password and email are required please"})
    }
    try{

        const duplicate = await User.findOne({fullName:fname,password:pwd}).exec();
        if(duplicate) return res.sendStatus(409).json({message:"User already exists!"});
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd,salt);
        console.log(hashedPwd);
        const newUser = await User.create({
            "fullName":fname,
            "password":pwd,
            "email":email
        }
        )
        res.sendStatus(201).json({message:`New user ${newUser.fullName} is created`})
    }
    catch(err){
     res.sendStatus(500).json({error:true,message:"an error occured","message":err.message})
    }
   
}
module.exports = {handleNewUser};