const express = require('express');
const userControllers = require('../../controllers/superadmins/userControllers');
const router = express.Router();

const middleware = require('../../middleware/auth');

router.post('/register', userControllers.signupsa)
router.post('/login',userControllers.loginsa)
router.get('/users',middleware,userControllers.getAllUser)
router.patch('/users/:id',middleware,userControllers.updateUserById)
router.delete('/users/:id',middleware,userControllers.deleteUserById)

module.exports = router;