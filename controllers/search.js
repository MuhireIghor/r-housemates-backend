const express = require('express');
const Property = require('../models/Property');
const mongooose = require('mongoose');
const searchContent = async(req,res,next)=>{
    const options = req.query.options.split(",");
    try{
        const properties = await Promise.all(options.map(async (opt)=>{
            const match = await Property.find({option:opt});
            res.status(200).json(match);

        }))

    }
    catch(err){
     next(err)
    }
}
module.exports = searchContent