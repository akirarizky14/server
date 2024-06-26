const express = require('express');
const profControllers = require('../../controllers/superadmins/profControllers');
const router = express.Router();

router.get('/getAllProf',profControllers.getAllProfs);

module.exports = router;