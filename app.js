const express = require('express');const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models')

//templating setup
var env = nunjucks.configure('views', { noCache: true }); // template is in views folder, caching off
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', nunjucks.render); // how to render html templates

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes middleware
app.use(routes);

// sync sequelize tables
models.db.sync({force: true})
.then(function(){
  // start server
  app.listen(1337, function(){
    console.log('listening on port 1337');
  });
})
.catch(console.error);

// static middleware
app.use(express.static(path.join(__dirname, '/public')));
