const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialize_development', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error '));

db.once('open', function(){
    console.log('successfully connected to database');
})

module.exports = db;