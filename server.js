require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const saUser = require('./routers/superadmins/userRoutes')
const uUser = require('./routers/users/userRoutes')
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(express.json());
app.use('/v1/api/superadmin/',saUser)
app.use('/v1/api/user/',uUser)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })