require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const app = express()

app.use(express.static(path.join(__dirname, '')));


// User Routes
const uUser = require('./routers/users/userRoutes')
const uCat = require('./routers/users/catRoutes')
const uCourse = require('./routers/users/courseRoutes')
const uProfs = require('./routers/users/profRoutes')

// SuperAdmin Routes
const saUser = require('./routers/superadmins/userRoutes')
const saCat = require('./routers/superadmins/catRoutes')
const saCourse = require('./routers/superadmins/courseRoutes')
const saProf = require('./routers/superadmins/profRoutes')

const cors = require('cors')

app.use(express.json());
app.use(cors({
  origin:'*', 
  allowedHeaders: ['Content-Type','Authorization']
}));

// Superadmin
app.use('/v1/api/superadmin/professional',saProf)
app.use('/v1/api/superadmin/categories',saCat)
app.use('/v1/api/superadmin/course',saCourse)
app.use('/v1/api/superadmin/',saUser)

// User
app.use('/v1/api/user/',uUser)
app.use('/v1/api/user/categories',uCat)
app.use('/v1/api/user/course',uCourse)
app.use('/v1/api/user/professional',uProfs)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })