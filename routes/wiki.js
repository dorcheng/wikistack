const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.send('GET /wiki/ which will retrieve all pages');
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // console.log(req.body);

  // var user = User.build({
  //   name: req.body.name,
  //   email: req.body.email
  // });

  // User.findOrCreate( {where: {name: req.body.name, email: req.body.email} })

  // page.save().then(function(page){
  // // console.log(savedPage.dataValues.urlTitle)
  // res.redirect(page.route); // route virtual FTW
  // }).catch(next);



  User.findOrCreate({
  where: {
    name: req.body.name,
    email: req.body.email
  }
})
.then(function (values) {

  var user = values[0];


  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  return page.save().then(function (page) {
    return page.setAuthor(user);
  });

})
.then(function (page) {
  res.redirect(page.route);
})
.catch(next);

});

router.get('/add', function(req, res, next) {
  //res.send('get the add page here!')
  res.render('addpage', { title: req.body.title });
});



router.get('/:urlTitle', function (req, res, next) {
  var page = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    res.render('wikipage', {title: page.title, content: page.content});
  })
  .catch(next);
});

module.exports = router;
