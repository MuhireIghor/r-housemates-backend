const jwt = require('jsonwebtoken');
const verifyJwt = (req,res,next)=> {
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    if(!authHeaders?.startsWith('Bearer '))return res.sendStatus(401).send("Unauthorised");
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.status(403);
            req.fullName = decoded.AboutUser.fullName
            req.email = decoded.AboutUser.email;
            req.roles = decoded.AboutUser.roles;
            next();
        }
    )

}
module.exports = verifyJwt;