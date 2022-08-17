const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User2 = require('../models/User2');

const handleLogIn = async (req, res) => {
    try {
        const { fname, pwd, email } = req.body;
        if (!fname||!pwd||!email) {
            return res.status(400).json({ "message": "FullName ,email and password are required please" })
        };
        const foundeUser = await User2.findOne({ fullName:fname}).exec();
        if (!foundeUser) {
            return res.status(401).json({ "message": "Unauthorised" })
        }
        console.log(foundeUser);
        const match = await bcrypt.compare(pwd,foundeUser.password);
        console.log(match);
        console.log(pwd);
        if (match){
            const roles = Object.values(foundeUser.roles)
            const accessToken = jwt.sign({
                "AboutUser":{
                    "fullName": foundeUser.fullName,
                    "email": foundeUser.email,
                    "roles":roles
                }
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '60s'
            })
            const refreshToken = jwt.sign({
                "fullName": foundeUser.fullName,
                "email": foundeUser.email
            }, process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' })
            foundeUser.refreshToken = refreshToken;
            const result = await foundeUser.save();
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json(accessToken)
}
else{
    return res.status(401).json({ message: "Unauthorised" })
}
        
    }
    catch (err) {
        console.error(err);
    }
}
module.exports = { handleLogIn }