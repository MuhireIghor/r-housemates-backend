const express = require('express');
const User2 = require('../models/User2');
const bcrypt = require('bcrypt');
const getUser = async(req,res)=>{
    const users = await User2.find();
    console.log(users);
    res.send(users);
}
const createNewUser = async(req,res)=>{
    if(!req?.body?.fname||!req?.body?.email || req?.body.pwd){
        return res.status(400).json({"message":"fullname,email and password are required please!"})
    }
    try{
        const result = await User2.create({
            fullName:req.body.fname,
            email:req.body.email,
            password:req.body.pwd
              });
        res.status(201).json({result}) ;
    }catch(err){
        console.error(err);
    }
    
        // res.status(201).json({
            //     'firstName':req.body.firstName,
            //     'lastName':req.body.lastName
            // })
        };
const updateUser = async(req,res)=>{
const user = await User2.findByIdAndUpdate(req.params.id,
    {
        fullName:req.body.fname,
        email:req.body.email
    }
    

,{new:true}
)
const result = await user.save();
res.send(result);
console.log(result);

}
const deleteUser = async(req,res)=>{
    try{

        
        const user = await User2.findByIdAndRemove(req.params.id).exec();
        if(user){
            console.log('user deleted');
            console.log(user);
            res.send(user).sendStatus(204);
        } 
    }
    catch(err){
        console.log(err.message);

    }
}
const getOneUser = async(req,res)=>{
    const user = await User2.findOne({_id:req.params.id});
    if(user) {
        console.log('user successfully found!');
        res.send(user)
    }else{
        console.log(`uses with id ${req.params.id} is not found!`);
    }
}
module.exports = {getUser,createNewUser,updateUser,deleteUser,getOneUser}