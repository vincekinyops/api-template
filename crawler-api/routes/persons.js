// persons.js

var express = require('express');
var router = express.Router();
var db = require('../db');
const { Person } = db.models

router.get('/all', async function (req, res) {
	const users = await Person.findAll()
	
	if (users) {
		return res.status(200).send({ users })
	}

	res.status(404).send({ error: 'No users found' })
});

router.get('/:id', function (req, res) {
	db.Person.findByPk(req.params.id)
		.then((person) => {
			res.status(200).send(JSON.stringify(person));
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err));
		});
});

router.post('/', async function (req, res) {
	try {
		const person = await Person.create(req.body)
		res.status(200).send(JSON.stringify(person));
	} catch (error) {
		res.status(404).send(JSON.stringify(error));
	}
});

router.delete('/:id', function (req, res) {
	db.Person.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			res.status(200).send();
		})
		.catch((err) => {
			res.status(500).send(JSON.stringify(err));
		});
});

module.exports = router;
