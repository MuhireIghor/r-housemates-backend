 const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/User');
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   await User.findOne({googleId:profile.id,fullName:profile.displayName,email:profile.email},function(err,currentUser){
      if(currentUser !== null){
        done(null,currentUser);
        console.log(currentUser);
      }
      else{
        var d = new Date();
        var n = d.getTime();
        var User3 = {
          googleId:profile.id,
          username:profile.displayName,
          // refreshToken:refreshToken,
          email:profile.email,
  
        };
        User.create(User3,(err,newUser)=>{ });
        var newUser = User3;
        done(null,newUser);
        console.log(newUser);
      }

    });
      // console.log(result);
      // console.log(profile);
      //    console.log(err.message);
    
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})