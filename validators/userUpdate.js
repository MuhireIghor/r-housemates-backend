const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const  User2 = require('../models/User2');
const validateUser = async(req,res,next)=>{
    try{
        const schema = Joi.object({
            fullName:Joi.string().required().alphanum(),
            email:Joi.required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.required().unique().string()
        });
        const{error} = await schema.validate(req.body);
        if(error){
            return res.status(401).json({
                error:error.message,
                message:"Unable to update the user"
            })
        }
        return next()

    }catch(err){
        return res.status(400).send(err.message);
    }

}
module.exports = {validateUser}