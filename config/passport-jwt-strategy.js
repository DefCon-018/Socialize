const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');

console.log("env ", env.jwt_secret);
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
}))

module.exports = passport