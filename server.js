var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./models/users'),
    Note = require('./models/notes'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

var promise = mongoose.connect('mongodb://localhost/notes-server', {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes');
routes(app);

app.listen(port);

console.log('Server started on: ' + port);