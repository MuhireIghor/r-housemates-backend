const express = require('express');
const router = express.Router();
const agentController = require('../../controllers/agentApprove.controller');

router.post('/reg',agentController.createAgent);
router.post('/auth',agentController.registerAgent);

module.exports = router;