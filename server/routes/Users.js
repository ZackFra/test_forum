const User = require('./modals/User.Modal');
const crypto = require('crypto');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// @route   POST user
// @desc    Authenticate user + pass
// @access  public
router.post('/Authenticate', (req, res) => {
	const {user, pass} = req.body;
	const {hash, useed, pseed, jwtseed} = process.env;

	if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		return res.status(500).json('Invalid parameters: Only accepts strings');
	} 

	const userHash = crypto
		.createHmac(hash, useed)
		.update(user)
		.digest('hex');

	const passHash = crypto
		.createHmac(hash, pseed)
		.update(pass)
		.digest('hex');
	
	User.findOne({'user': userHash, "pass": passHash}, (err, data) => {
		if(data) {
			jwt.sign({user}, jwtseed, (err, token) => {
				if(err) {
					return res.status(500).json(err);
				} else {
					return res.status(200).json(token);
				}
			})
		} else {
			return res.status(500).json(err);
		}
	});
});

// @route   POST user
// @desc    add new user to db
// @access  public
router.post('/Register', (req, res) => {
	const {user, pass, email} = req.body;
	const {hash, useed, pseed, eseed} = process.env;
	const re = /\s/;
	
	if(!user || !pass) {
		return res.status(500).json('Invalid parameters: Must have both user and pass');
	} else if(typeof(user) !== 'string' || typeof(pass) !== 'string') {
		return res.status(500).json('Invalid parameters: Only accepts strings');
	} else if(user.length < 8 || pass.length < 8) {
		return res.status(500).json('Invalid parameters: user and pass must be 8 or more characters');
	} else if(re.test(user) || re.test(pass)) {
		return res.status(500).json('Invalid parameters: may not have spaces in username or password');
	}

	const userHash = crypto
		.createHmac(hash, useed)
		.update(user)
		.digest('hex');

	const passHash = crypto
		.createHmac(hash, pseed)
		.update(pass)
		.digest('hex');

	const emailHash = crypto
		.createHmac(hash, eseed)
		.update(email || 'NA')
		.digest('hex')
	

	User.create({'user': userHash, 'pass': passHash, 'email': emailHash}, (err, data) => {
		if(err) return res.status(500).json(err);
		return res.status(200).json(data);
	});
});

module.exports = router;