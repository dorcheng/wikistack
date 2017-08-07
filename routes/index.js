// act as table of contents for which routes we have and how to get to them
const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

// wiki & user router middleware
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function(req, res, next) {
  var pages = Page.findAll({})
  .then(function(pages){
    res.render('index', {pages: pages});
  })
  .catch(next);
})


module.exports = router;
