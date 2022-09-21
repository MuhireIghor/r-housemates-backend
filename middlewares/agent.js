const jwt = require('jsonwebtoken');
const createError = require('../config/error');
const verifyJwt2 = (req, res, next) => {
const cookie = req.headers.authorization;
const token  = cookie.split(' ')[1];
 jwt.verify(token,process.env.AGENT,(err,agent)=>{
    if(err) return res .status(403);
    console.log(agent);
    return next();

 });
    // if (!authHeaders?.startsWith('Bearer ')) return res.status(401).json({message:"Unauthorisedkok"});
    // const token = authHeaders.split(' ')[1];
    // jwt.verify(
    //     token,
    //     process.env.AGENT,
    //     (err, user) => {
    //         if (err) return res.status(403);
    //         req.user = user;
    //         return next();
    //     }
    // )
}
module.exports = verifyJwt2