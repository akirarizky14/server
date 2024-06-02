const express = require('express');
const catControllers = require('../../controllers/users/catControllers');
const router = express.Router();

const middleware = require('../../middleware/auth');

router.get('/getCategories',middleware ,catControllers.getAllCategoriesCustomer);


module.exports = router;