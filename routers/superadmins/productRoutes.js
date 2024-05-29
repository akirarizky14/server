const express = require('express');
const productControllers = require('../../controllers/superadmins/productControllers');
const middleware = require('../../middleware/auth');
const router = express.Router();

router.post('/postProduct',middleware,productControllers.postProducts);
router.get('/getAllProducts',middleware,productControllers.getAllProducts);

module.exports = router;