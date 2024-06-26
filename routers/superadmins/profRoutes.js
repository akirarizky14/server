const express = require('express');
const profControllers = require('../../controllers/superadmins/profControllers');
const router = express.Router();
const upload = require('../../mutler/multer')

const middleware = require('../../middleware/auth');

router.post('/postProf',middleware,upload.single('pict'),profControllers.postProf);
router.patch('/updateIDProf/:id',middleware,upload.single('pict'),profControllers.updateProf);
router.get('/getAllProf',middleware,profControllers.getAllProfs);
router.get('/getIDProf/:id',middleware,profControllers.getProfById);
router.delete('/deleteIDProf/:id',middleware,profControllers.deleteProf);

module.exports = router;