const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "Unauthorised!NO cookies found" })
    }
    const refreshToken = cookies.refreshToken;
    const foundeUser = await User.findOne({ refreshToken: refreshToken });
    console.log(foundeUser);
    if (!foundeUser) return res.status(401);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || foundeUser.fullName !== decoded.fullName) {
                console.log(err);
                console.log(decoded.fullName);
                console.log(foundeUser.fullName);

                return res.sendStatus(403);
            }
            const roles = Object.values(foundeUser.roles);
            const accessToken = jwt.sign(
                {
                    "aboutUser": {
                        "fullName": decoded.fullName,
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '45s' });
            res.json({ accessToken })
        },

    )
}
module.exports = refreshTokenHandler;