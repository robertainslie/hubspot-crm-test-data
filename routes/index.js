var express = require('express');
var router = express.Router();
var axios = require('axios');
var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Install Test Data Into HubSpot CRM' });
});

router.get('/bot', function(req, res, next) {
	console.log(req.body);
	res.send(200);
});

router.get('/auth', function(req, res, next) {
    if (req.query.code.length > 0) {
    	axios.post('https://api.hubapi.com/oauth/v1/token', qs.stringify({
		    grant_type:'authorization_code',
		    client_id:process.env.HS_CLIENT_ID,
		    client_secret:process.env.HS_CLIENT_SECRET,
		    redirect_uri:'https://hs-test-data.herokuapp.com/auth',
		    code:req.query.code
		  }))
		  .then(function (response) {
		  	var access_token = response.data.access_token;
		    res.render('success', { title: 'Success!', access_token:response.data.access_token, auth_message:'You have successfully authenticated. You should begin seeing test data in your portal shortly.'});
		    console.log('after render after render')
		  })
		  .then(
		  	console.log('in then after render')
		  	)
		  .catch(function (error) {
		    console.log(error);
		    res.render('success', { title: 'There was an issue.',auth_message:'Something went wrong.' });
		  });
    }
    else{
    	res.render('success', { title: 'There was an issue.',auth_message:'Something went wrong.' });
    }
});

function createCompany (accessToken,hubId) {
	axios.post(`https://api.hubapi.com/companies/v2/companies`, companyOne, {headers: {'Authorization': `Bearer ${accessToken}`}})
	.then(function(response){
		console.log(`Created company ${response.data.companyId}`)
	})
	.catch(function (error){
		console.log(`There was an error. Message: ${error.data}`)
	})
}

const companyOne = {
  "properties": [
    {
      "name": "name",
      "value": "Ministry of Magic"
    },
    {
      "name": "description",
      "value": "The governmental agency that oversees all matters magical"
    },
    {
      "name": "domain",
      "value": "ministryofmagic.gov"
    },
    {
      "name": "industry",
      "value": "government"
    }
  ]
}

const companyTwo = {
  "properties": [
    {
      "name": "name",
      "value": "Ministry of Magic"
    },
    {
      "name": "description",
      "value": "The governmental agency that oversees all matters magical"
    },
    {
      "name": "domain",
      "value": ""
    },
    {
      "name": "industry",
      "value": "government"
    }
  ]
}

module.exports = router;
