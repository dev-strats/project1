const express = require('express');
const router = new express.Router();


// get list
router.get('/get-list', (req, res) => {
	let name = req.query.name;
	const strategiesList = require('../public/json/${name}-list.json');
  	res.status(200).json(strategiesList);
});


// strategy-detail
router.get('/strategy-detail', (req, res) => {
	let id = req.query.id;
	const strategyDetail = require('../public/json/strategy/' + id + '.json');
  	res.status(200).json(strategyDetail);
});

// Type-Specific Parameters
router.get('/type-specific-parameters', (req, res) => {
	let type = req.query.type;
	const typeSpecific = require('../public/json/type-parameter/' + type + '.json');
  	res.status(200).json(typeSpecific);
});

module.exports = router;
