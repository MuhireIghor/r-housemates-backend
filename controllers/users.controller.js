const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const getUser = async(req,res)=>{
    const users = await User.find();
    console.log(users);
    res.send(users);
}
const handleNewUser = async(req,res)=>{
    try{
    const{fname,pwd,email} = req.body;
    if(!fname || !pwd || !email){
        return res.sendStatus(400).json({"message":"fullName,password and email are required please"});
    }

        const duplicate = await User.findOne({fullName:fname,password:pwd}).exec();
        if(duplicate) return res.sendStatus(409).json({"message":"User already exists!"});
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd,salt);
        console.log(hashedPwd);
        const newUser = await User.create({
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
   
};
const updateUser = async(req,res)=>{
const user = await User.findByIdAndUpdate(req.params.id,
    {$set:{
        fullName:req.body.fname,
        email:req.body.email
    }
        
    }

,{new:true}
)
const result = await user.save();

}
const deleteUser = async(req,res)=>{
    try{

        
        const user = await User.findByIdAndRemove(req.params.id).exec();
        if(user){
            console.log('user deleted');
            console.log(user);
            res.send(user);
        } 
    }
    catch(err){
        console.log(err.message);

    }
}
const getOneUser = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id});
    if(user) {
        console.log('user successfully found!');
        res.send(user)
    }else{
        console.log(`uses with id ${req.params.id} is not found!`);
    }
}
module.exports = {getUser,handleNewUser,updateUser,deleteUser,getOneUser}