require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

// User Routes
const uUser = require('./routers/users/userRoutes')

// SuperAdmin Routes
const saUser = require('./routers/superadmins/userRoutes')
const saCat = require('./routers/superadmins/catRoutes')
const saCourse = require('./routers/superadmins/courseRoutes')

const cors = require('cors')

app.use(express.json());
app.use(cors({
  origin:'*', 
  allowedHeaders: ['Content-Type','Authorization']
}));

// Superadmin
app.use('/v1/api/superadmin/categories',saCat)
app.use('/v1/api/superadmin/course',saCourse)
app.use('/v1/api/superadmin/',saUser)

// User
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