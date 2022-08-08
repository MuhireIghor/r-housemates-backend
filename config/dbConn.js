const mongoose = require('mongoose');
async function connectDb(){
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

    }
    catch(err){
        console.error(err);
    }
};
module.exports = connectDb;