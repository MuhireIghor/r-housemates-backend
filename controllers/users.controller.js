const express = require('express');
const User2 = require('../models/User2');
const bcrypt = require('bcrypt');
const createError = require('../config/error');
const getUser = async (req, res) => {
    console.log(req.user);
    const users = await User2.find();
    console.log(users);
    res.json(users).status(200);
}
const createNewUser = async (req, res, next) => {
    if (!req?.body?.fname || !req?.body?.pwd || !req?.body?.email&&!req?.body?.phoneNumber) {
        return res.status(400).json({ "message": "fullname,email or phoneNumber and password are required please!" })
    }
    try {
        const result = await User2.create({
            fullName: req.body.fname,
            email: req.body.email,
            phoneNumber:req.body.phoneNumber,
            password: req.body.pwd
        });
        const {isAdmin,__v,...others} = result._doc
        res.status(201).json(others);
    } catch (err) {
        next(err);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const user = await User2.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    fullName: req.body.fname,
                    email: req.body.email
                }
            }, { new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {

        const user = await User2.findByIdAndRemove(req.params.id).exec();
        console.log('user deleted');
        console.log(user);
        res.send(user).sendStatus(204);

    }
    catch (err) {
        next(err);
    }
}
const getOneUser = async (req, res, next) => {
    try {
        const user = await User2.findOne({ _id: req.params.id });
        if (!user) return createError(401, "User not found!");
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}
module.exports = { getUser, createNewUser, updateUser, deleteUser, getOneUser }