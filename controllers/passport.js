 const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Google = require('../models/Google')
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try{

      const result = await Google.create({googleId:profile.id,fullName:profile.displayName});
      console.log(result);
      console.log(profile);
    }catch(err){
      console.log(err.message);
    }
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})