const exp = require('express')
const app = exp()
require('dotenv').config()//stores env variables in process.env
const mongoose = require('mongoose')
const userApp=require('./APIs/userApi')
const adminApp=require('./APIs/adminApi')
const cors=require('cors')

port = process.env.PORT
//db connection
mongoose.connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`server is listening on port ${port}...`))
    console.log('DB connection successful')
  })
  .catch((err) => console.log('Error in connecting to DB:', err))
//body parser middleware
app.use(exp.json())

app.use(cors({
  origin: 'http://localhost:5173', // or use '*' for all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies or sessions
}));
//connect API routes
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)