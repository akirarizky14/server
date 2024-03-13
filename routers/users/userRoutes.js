const express = require('express');
const userControllers = require('../../controllers/users/userControllers');
const router = express.Router();

router.post('/register', userControllers.createUser);
router.post('/verify-email', userControllers.verifyEmail);
router.post('/login', userControllers.loginUser);


module.exports = router;