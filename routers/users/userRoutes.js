const express = require('express');
const userControllers = require('../../controllers/users/userControllers');
const router = express.Router();
const requireAuth = require('../../middleware/auth.js')
router.post('/register', userControllers.createUser);
router.post('/verify-email', userControllers.verifyEmail);
router.post('/login', userControllers.loginUser);
router.get('/getDataByEmail/:email', requireAuth ,userControllers.getDataByEmail);


module.exports = router;