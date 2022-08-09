const express = require('express');
const User = require('../models/User');
const router = express.Router();
router.post('/',async(req,res)=>{
    const {fname,pwd,email} = req.body;
    if(!fname || !pwd ||!email){
        return res.status(400).json({"message":"FullName ,email and password are required please"})
    };
    const foundeUser = await User.findOne({fullName:fname,password:pwd}).exec();
    if(!foundeUser){
        return res.status(401).json({message:"Unauthorised"})
    }
const match = await bcrypt.compare(pwd,foundeUser.pwd);
if(!match){
    return res.sendStatus(401).json({message:"Unauthorised"})
}
const accessToken = jwt.sign({
    "fullName":foundeUser.fullName,
    "email":foundeUser.email
},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:'30s'
})
const refreshToken = jwt.sign({
    "fullName":foundeUser.fullName,
    "email":foundeUser.email
},process.env.REFRESH_TOKEN_SECRET,
{expiresIn:'1d'})
foundeUser.refreshToken = refreshToken;
const result = await foundeUser.save();

})
module.exports = router;