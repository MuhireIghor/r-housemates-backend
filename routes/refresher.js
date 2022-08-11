const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('../controllers/refreshToken.controller');
router.get('/',refreshTokenHandler);
module.exports = router;