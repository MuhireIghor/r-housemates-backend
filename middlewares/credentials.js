
// const credentials = (req,res,next)=>{
// //      // Website you wish to allow to connect
// //     //  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// //      // Request methods you wish to allow
// //      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
// //      // Request headers you wish to allow
// //      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
// //      // Set to true if you need the website to include cookies in the requests sent
// //      // to the API (e.g. in case you use sessions)
//      res.setHeader('Access-Control-Allow-Credentials', true);
//      next()
// }
// module.exports = credentials;
const allowedOrigins = require('../config/allowedOrigins');
const   credentials = (req,res,next)=>{
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next();

}
module.exports = credentials;