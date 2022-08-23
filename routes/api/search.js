const express = require('express');
const router = express.Router();
const searchContent = require('../../controllers/search');

router.get('/',searchContent);
module.exports = router;