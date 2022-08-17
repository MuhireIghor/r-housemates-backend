const express = require("express");
const router = express.Router();
const getUser = require('../../controllers/users.controller');
const userValid = require('../../validators/userUpdate');
const verifyRoles= require('../../middlewares/verifyRoles');
const roles =require('../../config/rolesList');

router.get('/',getUser.getUser);
router.post('/',userValid.validateUser,getUser.createNewUser)
router.put('/:id',getUser.updateUser)   
router.delete('/:id',getUser.deleteUser)
router.get('/:id',getUser.getOneUser)

module.exports = router;