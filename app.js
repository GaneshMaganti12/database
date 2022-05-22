const express = require('express')
const app = express()
const cors = require('cors')
const colors = require('colors')
const mongoose = require('mongoose')
const productRoute = require('./Routes/Products')
const userRoute = require('./Routes/User')
const taskRoute = require('./Routes/Task')
const errorHandling = require('./Middleware/ErrorHandling')

const url = 'mongodb://localhost:27017/Ganesh';

const connectToMongoose = async() =>{
    await mongoose.connect(url)
    console.log("connected to Mongoose database")
}

connectToMongoose()

app.use(cors())
app.use(express.json())
app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('/tasks', taskRoute)

app.use(errorHandling)


app.listen(3005, () => console.log("server is running in 3005 port"))