const jwt = require('jsonwebtoken');
const verifyJwt = (req,res,next)=> {
    if(!authHeaders?.startsWith('Bearer ')){return res.sendStatus(401).json({"message":"Unauthorised"})}
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.status(403);
            req.fullName = decoded.fullName;
            req.email = decoded.email
            next();
        }
    )

}
module.exports = verifyJwt;