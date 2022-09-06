const express = require('express');
const Property = require('../models/Property')
const createError = require('../config/error');
const getProperty = async (req, res) => {
    const Properties = await Property.find();
    console.log(Properties);
    res.json(Properties).status(200);
}
const createNewProperty = async (req, res, next) => {
    if (!req?.body?.name || !req?.body?.location || !req?.body?.option) {
        return res.status(400).json({ "message": "name,location and option are required please!" })
    }
    try {
        const result = await Property.create({
            name: req.body.name,
            location: req.body.location,
            option: req.body.option
        });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};
const updateProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, { new: true }
        );
        res.status(200).json(property);
    } catch (err) {
        next(err);
    }
};

const deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndRemove(req.params.id).exec();
        console.log('Property deleted');
        console.log(property);
        res.json(property).sendStatus(204);

    }
    catch (err) {
        next(err);
    }
}
const getOneProperty = async (req, res, next) => {
    try {
        const property = await Property.findOne({ _id: req.params.id });
        if (!property) return createError(401, "Property not found!");
        res.status(200).json(property);
    } catch (err) {
        next(err)
    }
}
const likeProperty = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No property with that Id");
    try{
  const post = await Property.findById(id);
      const updatedPost = await Property.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
      res.json(updatedPost);
  
    }catch(error){
      console.log(error);
    }
  
  }
module.exports = { getProperty, createNewProperty, updateProperty, deleteProperty, getOneProperty,likeProperty }