const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 5000




// Routers
const HomeRouter = require('./routes/mainGet')

app.use('/api', HomeRouter)


app.listen(port, ()=>{
	console.log(`App Listening to Port ${port}`)
});