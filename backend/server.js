const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {readdirSync} = require('fs')
require('dotenv').config()
const connectDB = require('./config/connect')
const bodyParser = require('body-parser')

const app = express()

connectDB()

//midleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

//Route
readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))



const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server in runing on port ${PORT}`)
})