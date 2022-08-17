const express = require('express');
const bcrypt = require('bcrypt');
const User2 = require('../models/User2');
const handleNewUser = async(req,res)=>{
    try{
    const{fname,pwd,email} = req.body;
    if(!fname || !pwd || !email){
        return res.sendStatus(400).json({"message":"fullName,password and email are required please"});
    }

        const duplicate = await User2.findOne({fullName:fname,password:pwd}).exec();
        if(duplicate) return res.sendStatus(409).json({"message":"User already exists!"});
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd,salt);
        console.log(hashedPwd);
        const newUser = await User2.create({
            "fullName":fname,
            "password":hashedPwd,
            "email":email
        }
        )
        res.status(201).json({"message":`New user ${newUser.fullName} is created`});
        console.log(newUser);
    }
    catch(err){
        console.error(err);
     res.sendStatus(500).json({error:true,message:"an error occured"})
    }
   
}
module.exports = {handleNewUser};