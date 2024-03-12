const express = require('express');
const userControllers = require('../../controllers/superadmins/userControllers');
const router = express.Router();

router.post('/users',userControllers.signupsa)
router.get('/users',userControllers.getAllUser)
router.patch('/users/:id',userControllers.updateUserById)
router.delete('/users/:id',userControllers.deleteUserById)

module.exports = router;