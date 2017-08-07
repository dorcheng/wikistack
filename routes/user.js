const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  // console.log(users);
  User.findAll()
  .then(function(users){
    res.render('users', {users: users});
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  // console.log(users);
  User.findAll({
    where: {
    id: req.params.id,
  }})
  .then(function(users){
    res.render('users', {users: users});
  })
  .catch(next);
});

module.exports = router;
