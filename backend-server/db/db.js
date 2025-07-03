const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI

mongoose.set('strictQuery', true); // to make sure we get an error if a required field is missing in the query
mongoose.connect(URI)
.then(()=> console.log('Connected to DB'))
.catch((error) => console.log(error))
