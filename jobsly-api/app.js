var express    = require('express');
var bodyParser = require('body-parser');
var jobslys = require('./routes/jobslys') 
require('dotenv').load()

var app = express();

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/jobslys', jobslys);

app.listen(process.env.PORT || 8080);
console.log('Server started on localhost://8080');

module.exports = app
