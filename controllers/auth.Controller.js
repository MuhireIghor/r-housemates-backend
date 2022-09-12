const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User2 = require('../models/User2');

const handleLogIn = async (req, res,next) => {
    try {
        const { fname, pwd, email } = req.body;
        if (!fname||!pwd||!email) {
            return res.status(400).json({ "message": "FullName ,email and password are required please" })
        };
        const foundeUser = await User2.findOne({ fullName:fname,pwd:pwd}).exec();
        if (!foundeUser) {
            return res.status(401).json({ "message": "no user found!" })
        }
        const match = await bcrypt.compare(pwd,foundeUser.password);
        if (match){        
            const accessToken = jwt.sign({
                    fullName: foundeUser.fullName,
                    email: foundeUser.email,
                    isAdmin:foundeUser.isAdmin
                     }, process.env.ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign({
                fullName: foundeUser.fullName,
                email: foundeUser.email
            }, process.env.REFRESH_TOKEN_SECRET)
            foundeUser.refreshToken = refreshToken;
            const result = await foundeUser.save();
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({token:accessToken})
}
else{
    return res.status(401).json({ message: "Unauthorised" })
}}
    catch (err) {
        next(err);
    }
}
module.exports = { handleLogIn }