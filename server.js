require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConn = require('./config/dbConn');
const PORT = process.env.PORT || 3000;
const app = express();
dbConn();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/register',require('./routes/register'));


mongoose.connection.once('open',
()=>{
    console.log('connected Successfully to mongodb')
    app.listen(PORT,()=>console.log(`App listening on Port ${PORT}`));
}
    );
