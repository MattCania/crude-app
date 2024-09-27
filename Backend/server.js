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