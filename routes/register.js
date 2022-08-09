const express = require('express');
const router = express.Router();
const handleNewUserController = require('../controllers/register.Controller');
router.post('/',handleNewUserController.handleNewUser)
module.exports = router;