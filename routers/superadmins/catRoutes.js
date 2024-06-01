const express = require('express');
const catControllers = require('../../controllers/superadmins/catControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

router.post('/postCat',middleware,catControllers.postCategories);
router.get('/getAllCategories',middleware,catControllers.getAllCategories);
router.patch('/updateCategoryById/:id',middleware,catControllers.updateCategories);
router.delete('/deleteCategoryById/:id',middleware,catControllers.deleteCategories);


module.exports = router;
