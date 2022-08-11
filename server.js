require('dotenv').config();
const express = require('express');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const dbConn = require('./config/dbConn');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const verifyJwt = require('./middlewares/verifyJwt');
const credentials = require('./middlewares/credentials');
const PORT = process.env.PORT ||3000;
dbConn();
app.use(credentials);
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.get('/',(req,res)=>{
    res.status(201).send({"message":"wow    "})
});
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresher',require('./routes/refresher'));
app.use(verifyJwt)
app.all('*',(req,res)=>{
    if(req.accepts('html')){
        res.send('404 Not Found')
    }
    else if(req.acceptsCharsets('json')){
        res.json({"memssage":"Not found "})
    }
else{
    res.type('text').send(" 404 not found!!")
}
})
app.use(errorHandler)
mongoose.connection.once('open',
()=>{
    console.log('connected Successfully to mongodb');
    app.listen(PORT,()=>console.log(`App listening on Port ${PORT}`));
}
    );
