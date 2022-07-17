var express = require('express');
var router = express.Router();
var db = require('../db')

/**
 * Routes
 */
const contractRoutes = require('./contract')

/* GET home page. */
router.get('/', function (req, res, next) {
	res.status(200).send({ title: 'Testing' });
});

module.exports = router;
