const express = require('express');
const catControllers = require('../../controllers/superadmins/catControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

router.post('/postCat',middleware,catControllers.postCategories);
router.get('/getAll',middleware,catControllers.getAllCategories);

module.exports = router
