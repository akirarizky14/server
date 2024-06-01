const express = require('express');
const courseControllers = require('../../controllers/superadmins/courseControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

router.post('/postCourse',middleware,courseControllers.createCourse);
router.get('/getAllCourses',middleware,courseControllers.getAllCourses);
router.get('/getCourseById/:id',middleware,courseControllers.getCourseById);
router.get('/getCourseByUser/:id',middleware,courseControllers.getCourseByUser);
router.patch('/updateCourseById/:id',middleware,courseControllers.updateCourseById);
router.delete('/deleteCourseById/:id',middleware,courseControllers.deleteCourseById);

module.exports = router;