const express = require('express');
const multer = require('multer');
const path = require('path');
const courseControllers = require('../../controllers/superadmins/courseControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/')); // Folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file yang diunggah
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const cpUpload = upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

router.post('/postCourse', middleware, cpUpload, courseControllers.createCourse);
router.get('/getAllCourses', middleware, courseControllers.getAllCourses);
router.get('/getCourseById/:id', middleware, courseControllers.getCourseById);
router.get('/getCourseByUser/:id', middleware, courseControllers.getCourseByUser);
router.patch('/updateCourseById/:id', middleware, courseControllers.updateCourseById);
router.delete('/deleteCourseById/:id', middleware, courseControllers.deleteCourseById);

module.exports = router;
