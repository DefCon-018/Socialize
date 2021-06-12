const express = require('express');
const port = 8000;
const app = express();
const env = require('./config/environment');
const path = require('path');
const logger = require('morgan');
console.log(env.morgan.mode);

//sass middleware
const sassMiddleware = require('node-sass-middleware');

if(env.name == "development"){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }))
}


// for view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// for static files
app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.urlencoded());

// cookie parse 
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(logger('combined', env.morgan.options));

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
const JWTStrategy = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// socket setup
const chatServer = require('http').createServer();
const chatSocket = require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is running on port 5000");

const session = require('express-session');
app.use(session({
    name: 'Socialize', 
    secret: env.session_cookie_key,
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: `mongodb://localhost/${env.db}`,
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

