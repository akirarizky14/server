const express = require('express');
const userControllers = require('../../controllers/superadmins/userControllers');
const router = express.Router();

router.post('/register',userControllers.signupUser)

module.exports = router;