require('dotenv').config();
const express = require('express');
// const cookieparser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const corsOptions = require('./config/corsOptions');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc= require('swagger-jsdoc');
const dbConn = require('./config/dbConn');
require('./controllers/passport');
const errorHandler = require('./middlewares/errorHandler');
const verifyJwt = require('./middlewares/verifyJwt');
const credentials = require('./middlewares/credentials');
const isLoggedin = require('./middlewares/isLoggedin');
const PORT = process.env.PORT ||3000;
const app = express();
app.use(session({secret:'cats',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session())
dbConn();
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:'R&HOUSEMATE BACKEND API',
            version:'1.0.0',
            description:'A full API documentation for the R&HOUSEMATES backend APIs'
        },
        servers:[
            {
                url:"http://localhost:3000"
            }
        ]
        
    },
    apis:["./routes/*.js"],
}
const specs = swaggerJsDoc(options);

app.set('view engine','ejs');
app.use(credentials);
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs));
app.use('/public',express.static('public'));
// app.use(cookieparser());
app.get('/',(req,res)=>{
    res.render('login')
    // res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get('/auth/google',
    passport.authenticate('google',{scope:['email','profile']})
)
app.get('/google/callback',
passport.authenticate('google',
{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'
}))
app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong!!')
})
app.get('/protected',isLoggedin,(req,res)=>{
    res.send(`hello ${req.user.displayName}`)
})
app.get('/passportlogout',(req,res)=>{
    res.logout();
    res.send('Go to the login page!')
})
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresher',require('./routes/refresher'));
app.use('/logout',require('./routes/logout'));
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
