const express = require('express');
const port = 8000;
const app = express();

//sass middleware
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))


// for view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// for static files
app.use(express.static('assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.urlencoded());

// cookie parse 
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// for layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//database 
const db = require('./config/mongoose');

// mongo store
const MongoStore = require('connect-mongo');

// Passport Local
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const session = require('express-session');
app.use(session({
    name: 'Socialize', 
    secret: 'Something',
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/socialize_development',
        autoRemove: 'disabled'
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash setup
const customMware = require('./config/custom_middleware');
const flash = require('connect-flash');
app.use(flash());
app.use(customMware.setFlash);

// for routes
app.use('/', require('./routes'));

// starting server
app.listen(port, function(err){
    if(err){
        console.log("error on running the server");
        return;
    }
    console.log("server is up and running on port ", port);
})

