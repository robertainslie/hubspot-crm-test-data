var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Install Test Data Into HubSpot CRM' });
});

router.get('/auth', function(req, res, next) {
	console.log(req.query.code);
	console.log(req.query.code.length);
    if (req.query.code.length > 0) {
    	res.render('success', { title: 'Success!', auth_message:'You have successfully authenticated. You should begin seeing test data in your portal shortly.', code:req.query.code});
    }
    else{
    	res.render('success', { title: 'There was an issue.',auth_message:'Something went wrong.' });
    }
});

module.exports = router;
