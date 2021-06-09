const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: '213897699133-msefd52tijucq1pmdokeiicjvhdb7i4u.apps.googleusercontent.com',
        clientSecret: '-plmRZ1ihxSZOO1fu24qeznK',
        callbackURL: 'http://localhost:8000/user/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("error ", err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null, user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error in creating user ", err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
))