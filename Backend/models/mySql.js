
const mysql = require('mysql')

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'crude_db',
	connectionLimit: 10
})

const selectValues = (callback) => {
	const selectQry = 'SELECT * FROM bsit2b';

	pool.query(selectQry, (err, result) => {
		if (err) {
			console.error('Query Error', err);
			return callback(err, null);
		}
		return callback(null, result);
	})
}

const updateValues = (callback, data) => {
	
}

module.exports = {
	selectValues
}