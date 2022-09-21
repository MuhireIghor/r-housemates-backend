const express = require('express');
const Property = require('../models/Property')
const createError = require('../config/error');
const { string } = require('joi');
const getProperty = async (req, res) => {
    const Properties = await Property.find();
    console.log(Properties);
    res.json(Properties).status(200);
}
const createNewProperty = async (req, res, next) => {
    if (!req?.body?.name || !req?.body?.Bedroom ||!req?.body?.Sittingroom ||!req?.body?.noFemale ||!req?.body?.noMale ||!req?.body?.noPerson ||!req?.body?.kitchen || !req?.body?.option) {
        return res.status(400).json({ message: "Please fill all the needed details!" })
    }
    const post = req.body;
    const result = new Property(post)
    try {
        // const result = await Property.create({
        //     post
        //     // name: req.body.name,
            // Sittingroom: req.body.SittingRoom,
        //     // Bedroom:req.body.Bedroom,
        //     // noFemale:req.body.noFemale,
        //     // noMale:req.body.noMale,
        //     // noPerson:req.body.noPerson,
        //     // kitchen:req.body.kitchen,
        //     // option: req.body.option,
await result.save();
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
const updateProperty = async (req,res,next) => {
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
  const index = post.likeCount.findIndex((id)=>id===string(req.user.id));
  if(index===-1){
    post.likeCount.push(req.user.id)
  }else{
    post.likeCount = post.likeCount.filter((id)=>id!== string(req.user.id))
  }
      const updatedPost = await Property.findByIdAndUpdate(id,post,{new:true});
      res.json(updatedPost);
  
    }catch(error){
      console.log(error);
    }
  
  }
module.exports = { getProperty, createNewProperty, updateProperty, deleteProperty, getOneProperty,likeProperty }