const express = require ("express")
const app = express()
const bodyParser= require("body-parser")
require('./db/db')
require("dotenv").config();

const cors = require('cors')
app.use(cors( {
  origin: "*",
  credentials: true
}))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const petRoute = require('./routes/petRoute')
const categoryRoute=require('./routes/categoryRoute')
const orderRoute = require('./routes/orderRoute')
const adminRoute =require('./routes/adminRoute')

app.use('/pet',petRoute)
app.use('/category',categoryRoute)
app.use('/order',orderRoute)
app.use('/admin',adminRoute)

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`)
})



