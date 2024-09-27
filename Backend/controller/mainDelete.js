const express = require('express')
const router = express.Router()

const databaseHandler = require('../models/mySql');

router.delete('/delete/:id', (req, res) => {
	const studentId = req.params.id;

	databaseHandler.deleteValues(studentId, (err, result) => {
		if (err) {
			return res.status(500).json({ error: 'Database error', details: err });
		}

		databaseHandler.adjustValues(studentId, (err, result) => {
			if (err) {
				return res.status(500).json({error: 'Database error', details: err});
			}
		})

		return res.json(result);
	})
})

module.exports = router








