const multer = require('multer');
const path = require('path');

// Tentukan tempat penyimpanan dan nama file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file yang diunggah
    }
});

// Filter file
const fileFilter = (req, file, cb) => {
    // Hanya menerima file gambar dan video
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

// Inisialisasi multer dengan konfigurasi yang telah dibuat
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
