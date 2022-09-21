const express = require('express');
const router = express.Router();
const agentController = require('../../controllers/agentApprove.controller');
const verifyJwt2 = require('../../middlewares/agent');

router.post('/reg',agentController.createAgent);
router.post('/auth',verifyJwt2,agentController.registerAgent);

module.exports = router;