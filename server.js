require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const saUser = require('./routers/superadmins/userRoutes')
const uUser = require('./routers/users/userRoutes')

app.use(express.json());
app.use('/v1/api/superadmin/',saUser)
app.use('/v1/api/user/',uUser)

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })