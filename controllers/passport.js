 const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/User');
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
   function(request, accessToken, refreshToken, profile, done) {
  const results =  User.findOrCreate({username:profile.displayName,googleId:profile._id,email:profile.email},async function(err,user){
    try{

      const result = await User.findById(user.googleId);
      if(result) console.log('user already exists!');
      console.log(user);
      return done(err,user);
      console.log(err);
    }
    catch(err){
      console.log(err.message);
    }
    
    
  });
        
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})