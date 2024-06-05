const express = require('express');
const upload = require('../../mutler/multer')
const courseControllers = require('../../controllers/superadmins/courseControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

router.use(middleware)
router.post('/postCourse', upload.fields([
    { name: 'photos', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), courseControllers.createCourse);

router.get('/getAllCourses',  courseControllers.getAllCourses);
router.get('/getCourseById/:id',  courseControllers.getCourseById);
router.get('/getCourseByUser/:id',  courseControllers.getCourseByUser);
router.patch('/updateCourseById/:id',  courseControllers.updateCourseById);
router.delete('/deleteCourseById/:id',  courseControllers.deleteCourseById);

module.exports = router;
