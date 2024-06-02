const express = require('express');
const userControllers = require('../../controllers/users/userControllers');
const router = express.Router();

const middleware = require('../../middleware/auth');

router.post('/register', userControllers.createUser);
router.post('/verify-email', userControllers.verifyEmail);
router.post('/login', userControllers.loginUser);
router.get('/getDataById',middleware ,userControllers.getDataById);


module.exports = router;