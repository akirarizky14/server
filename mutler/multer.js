const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});


// Inisialisasi multer dengan konfigurasi yang telah dibuat
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4'];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log("Only JPG and PNG files are allowed!");
            callback(new Error('Only JPG and PNG files are allowed!'));
        }
    },
});

module.exports = upload;
