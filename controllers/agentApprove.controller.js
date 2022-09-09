const express = require('express');
const mongoose = require('mongoose');
const createError = require('../config/error');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

const createAgent = async (req, res, next) => {
    const { phoneNumber, FullName } = req.body;
    if (!req?.body?.FullName || !req?.body?.phoneNumber) return res.status(400).json({message:'fUllName and email are required please!'});
    try {
        const result = await Agent.create(req.body);
        res.status(201).json(result)

    }
    catch (err) {
        next(err)
    }
}
const registerAgent = async (req, res, next) => {
    const { phoneNumber, FullName } = req.body;
    if (!req?.body?.FullName || !req?.body?.phoneNumber) return res.status(400).json('fUllName and email are required please!');
    try {
        const agentGiven = await Agent.find({ phoneNumber:phoneNumber,FullName:FullName}).exec();
        if(!agentGiven) return res.status(400).json({message:'Bad credentials'})

        const agentToken = jwt.sign({
            "FullName": agentGiven.FullName,
            "phoneNumber": agentGiven.phoneNumber
        }, process.env.AGENT)
   res.json(agentToken);
       
    } catch (err) {
        next(err)
    }

}

module.exports = { createAgent, registerAgent }