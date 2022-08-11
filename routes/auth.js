const express = require('express');
const router = express.Router();
const logInController = require('../controllers/auth.Controller');
router.post('/',logInController.handleLogIn)
module.exports = router;