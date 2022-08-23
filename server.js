require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const corsOptions = require('./config/corsOptions');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const { specs } = require('./config/swagger');
const dbConn = require('./config/dbConn');
const errorHandler = require('./middlewares/errorHandler');
const {verifyJwt} = require('./middlewares/verifyJwt');
const credentials = require('./middlewares/credentials');
const isLoggedin = require('./middlewares/isLoggedin');
const swaggerJson = require('./swagger.json')
require('./controllers/passport');
// const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const app = express();
dbConn();
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session())
app.set('view engine', 'ejs');
app.use(credentials);
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
    res.render('login')
});
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)
app.get('/google/callback',
    passport.authenticate('google',
        {   successRedirect: '/protected',
            failureRedirect: '/auth/failure'
        }))
app.get('/auth/failure', (req, res) => {
    res.send('something went wrong!!')
})
app.get('/protected', isLoggedin, (req, res) => {
    res.send(`hello ${req.user.username}`)
})
app.get('/passportlogout', (req, res) => {
    res.logout();
    res.send('Go to the login page!')
})
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresher', require('./routes/refresher'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJwt);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/property', require('./routes/api/property'));
app.use('/api/search', require('./routes/api/search'));
app.use(errorHandler)
mongoose.connection.once('open',
    () => {
        console.log('connected Successfully to mongodb');
        app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));
    }
);
