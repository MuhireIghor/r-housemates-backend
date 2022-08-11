const { all } = require('../routes/auth');
const allowedOrigns = require('./allowedOrigins');
const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedOrigns.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('An error occured!'))
        }
    },
    optionsSuccessStatus:200
};
module.exports = corsOptions;