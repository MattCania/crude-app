const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 5000

// Routers
const HomeRouter = require('./routes/mainGet')
const DeleteRouter = require('./controller/mainDelete')
const PostRouter = require('./controller/mainPost')

app.use('/api', HomeRouter)
app.use('/api', DeleteRouter)
app.use('/api', PostRouter)

app.listen(port, ()=>{
	console.log(`App Listening to Port ${port}`)
});

const shutdown = (signal) => {
    console.log(`Received ${signal}. Closing HTTP server and MySQL connection pool...`);
    
    // Close the MySQL pool
    db.closePool((err) => {
        if (err) {
            console.error('Error closing MySQL pool:', err);
        }
        
        // Exit the process
        console.log('Server shut down gracefully.');
        process.exit(0);
    });
};

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM'));