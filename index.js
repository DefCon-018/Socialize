const express = require('express');
const port = 8000;
const app = express();

// for view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// for static files
app.use(express.static('assets'));

// for layouts 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//database 
const db = require('./config/mongoose');

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

