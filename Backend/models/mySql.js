require('dotenv').config()
const mysql = require('mysql')

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	connectionLimit: process.env.DB_CONNECTION_LIMIT,
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


const deleteValues = (id, callback) => {
	
	const deleteQry = `DELETE FROM bsit2b WHERE id = ?`;
	const resetId = 'ALTER TABLE bsit2b AUTO_INCREMENT = 1';

	pool.query(deleteQry, [id], (err, result) => {
		if (err) {
			console.error('Query Error', err);
			return callback(err, null);
		}
		pool.query(resetId, (resetErr, resetResult) => {
			if (resetErr) {
				console.error('Reset ID Error', resetErr);
				return callback(resetErr, null); // Pass the reset error back if needed
			}
			return callback(null, result);
		});
	})
}

const adjustValues = (id, callback) =>{
	const adjustQry = `UPDATE bsit2b SET id = id - 1 WHERE id > ?`;

	pool.query(adjustQry, [id], (err, result) => {
		if(err) {
			console.error('Query Error', err);
			return callback(err, null);
		}

		pool.query('ALTER TABLE bsit2b AUTO_INCREMENT = 1', (err, result) => {
			if (err) {
				console.error('Query Error', err)
				return callback(err, null);
			}
			return callback(null, result);
		})
		return callback(null, result)
	})
}

const insertValues = (data, callback) => {
	const {
		StudentID,
		StudentName,
		StudentAge,
		StudentGWA
	} = data;

	if (!StudentID || !StudentName || !StudentAge || !StudentGWA){
		return callback (new Error('Missing Required Fields'));
	}

	const insertQry = 'INSERT INTO bsit2b (student_id, student_name, age, GWA) VALUES (?, ?, ?, ?)';

	pool.query(insertQry, [StudentID, StudentName, StudentAge, StudentGWA], (err, result) => {
		if (err){
			console.error('Database query error:', err)
			return callback(err)
		}
		callback(null, result)
	})
	
}

const closePool = (callback) => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing MySQL pool:', err);
            return callback(err);
        }
        console.log('MySQL pool closed.');
        callback(null);
    });
};


module.exports = {
	selectValues,
	deleteValues,
	insertValues,
	adjustValues,
	closePool,
	pool
}