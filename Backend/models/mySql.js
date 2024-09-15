
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
			console.log('Query Error', err);
			return callback(err);
		}
		callback(null, result);
	})

}

exports = {
	selectValues
}