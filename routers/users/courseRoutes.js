const express = require('express');
const courseControllers = require('../../controllers/users/courseControllers');
const router = express.Router();

const middleware = require('../../middleware/auth');

router.get('/getCourseByCategories/:categoryId',courseControllers.getCourseByCategories)
router.get('/getCourseForEvents',courseControllers.getCourseForEvents)
router.get('/getCourseByLevel/:difficulty', courseControllers.getCourseByLevel);

module.exports = router;