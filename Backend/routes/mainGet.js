
const express = require('express')
const router = express.Router()

const databaseHandler = require('../models/mySql')

router.get('/home', (req, res) => {
	databaseHandler.selectValues((err, result) => {
		if (err) {
			return res.status(500).json({ error: 'Database error', details: err });
		}
		return res.json(result);
	})
})


module.exports = router