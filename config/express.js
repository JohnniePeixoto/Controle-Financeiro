var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

app.use(express.static('./app/'));
app.use(bodyParser.json());

app.set('secret', 'johnniepeixoto');

consign()
  .include('modelos')
  .then('resources')
  .into(app);

module.exports = app;
