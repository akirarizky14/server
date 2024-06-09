const express = require('express');
const courseControllers = require('../../controllers/users/courseControllers');
const router = express.Router();

const middleware = require('../../middleware/auth');

router.get('/getCourseByCategories/:categoryId',courseControllers.getCourseByCategories)

module.exports = router;