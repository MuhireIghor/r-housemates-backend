const express = require("express");
const router = express.Router();
const getUser = require('../../controllers/users.controller');
const userValid = require('../../validators/userUpdate');
const verifyRoles= require('../../middlewares/verifyRoles');
const roles =require('../../config/rolesList');
const {verifyAdmin,verifyJwt} = require('../../middlewares/verifyJwt');

router.get('/',verifyJwt,getUser.getUser);
router.post('/',verifyJwt,getUser.createNewUser)
router.put('/:id',verifyJwt,getUser.updateUser)   
router.delete('/:id',verifyJwt,verifyAdmin,getUser.deleteUser)
router.get('/:id',verifyJwt,verifyAdmin,getUser.getOneUser)

module.exports = router;