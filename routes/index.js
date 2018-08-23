var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Install Test Data Into HubSpot CRM' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Success!' });
});

module.exports = router;
