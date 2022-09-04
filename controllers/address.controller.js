const express = require('express');
const Address = require('../models/Address');
const createError = require('../config/error');
const getAddress = async (req, res) => {
    const addresses = await Address.find();
    console.log(addresses);
    res.json(addresses).status(200);
}
const createNewAddress= async (req, res, next) => {
    if (!req?.body?.name || !req?.body?.PhoneNumber) {
        return res.status(400).json({ "message": "name and phone Number are required please!" })
    }
    try {
        const address = await Address.create({
            name: req.body.name,
            location: req.body.PhoneNumber
        });
        res.status(201).json(address);
    } catch (err) {
        next(err);
    }
};
const updateAddress = async (req, res, next) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, { new: true }
        );
        res.status(200).json(address);
    } catch (err) {
        next(err);
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const address = await Address.findByIdAndRemove(req.params.id).exec();
        console.log('Address deleted');
        console.log(address);
        res.json(address).sendStatus(204);

    }
    catch (err) {
        next(err);
    }
}
const getOneAddress = async (req, res, next) => {
    try {
        const address = await Address.findOne({ _id: req.params.id });
        if (!address) return createError(401, "Address not found!");
        res.status(200).json(address);
    } catch (err) {
        next(err)
    }
}
module.exports = { getAddress, createNewAddress, updateAddress, deleteAddress, getOneAddress }