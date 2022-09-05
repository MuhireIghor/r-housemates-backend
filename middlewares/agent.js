const jwt = require('jsonwebtoken');
const createError = require('../config/error');
const verifyJwt2 = (req, res, next) => {
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    if (!authHeaders?.startsWith('Bearer ')) return res.sendStatus(401).send("Unauthorised");
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.AGENT,
        (err, user) => {
            if (err) return res.status(403);
            req.user = user;
            return next();
        }
    )
}
module.exports = verifyJwt2