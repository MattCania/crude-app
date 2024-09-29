const express = require('express')
const router = express.Router()

const databaseHandler = require('../models/mySql')

router.post('/insertStudent', (req,res) => {
	const data = req.body;

	databaseHandler.insertValues(data, (err, result) => {
		if (err) return res.json({ error: err.message });
		return res.json(result)
	})
})

router.post('/adjustStudent/:id', (req, res) => {
	const data = req.body;

	databaseHandler.adjustValues(data, (err, result) => {
		if (err) return res.json({ error: err.message });
		return res.json(result)
	})
})
module.exports = router