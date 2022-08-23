const jwt = require('jsonwebtoken');
const createError = require('../config/error');
const verifyJwt = (req, res, next) => {
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    if (!authHeaders?.startsWith('Bearer ')) return res.sendStatus(401).send("Unauthorised");
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return res.status(403);
            req.user = user;
            return next();
        }
    )
}
const verifyAdmin = (req, res, next) => {
    verifyJwt(req, res, next, () => {
        if (req.user.isAdmin === true) {
            next();
        }
        else {
            return next(createError(401, "User unauthorised"));
            console.log(req.user.isAdmin);
        }
    })
}
module.exports = { verifyJwt, verifyAdmin };