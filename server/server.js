const exp = require('express')
const app = exp()
require('dotenv').config()//stores env variables in process.env
const mongoose = require('mongoose')
const userApp=require('./APIs/userApi')
const adminApp=require('./APIs/adminApi')

port = process.env.PORT
//db connection
mongoose.connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`server is listening on port ${port}...`))
    console.log('DB connection successful')
  })
  .catch((err) => console.log('Error in connecting to DB:', err))

//connect API routes
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)