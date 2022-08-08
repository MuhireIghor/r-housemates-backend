require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConn = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const app = express();
dbConn();
app.use(express.json());
app.use(express.urlencoded({extended:false}));








mongoose.connection.once('Open',
()=>{
    console.log('connected Successfully to mongodb')
    app.listen(PORT,()=>console.log(`App listening on Port ${PORT}`));
}
    );
