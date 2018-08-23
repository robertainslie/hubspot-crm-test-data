var express = require('express');
var router = express.Router();
var axios = require('axios');
var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Install Test Data Into HubSpot CRM' });
});

router.get('/auth', function(req, res, next) {
	console.log(req.query.code);
	console.log(req.query.code.length);
    if (req.query.code.length > 0) {
    	axios.post('https://api.hubapi.com/oauth/v1/token', qs.stringify({
		    grant_type:'authorization_code',
		    client_id:process.env.HS_CLIENT_ID,
		    client_secret:process.env.HS_CLIENT_SECRET,
		    redirect_uri:'https://hs-test-data.herokuapp.com/auth',
		    code:req.query.code
		  }))
		  .then(function (response) {
		  	var access_token = response.access_token
		    console.log(response);
		    res.render('success', { title: 'Success!', access_token:response.access_token, auth_message:'You have successfully authenticated. You should begin seeing test data in your portal shortly.'});
		  })
		  .catch(function (error) {
		    console.log(error);
		    res.render('success', { title: 'There was an issue.',auth_message:'Something went wrong.' });
		  });
    }
    else{
    	res.render('success', { title: 'There was an issue.',auth_message:'Something went wrong.' });
    }
});

module.exports = router;
