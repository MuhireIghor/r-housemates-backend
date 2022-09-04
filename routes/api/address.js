const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/address.controller');

router.get('/',addressController.getAddress);
router.get('/:id',addressController.getOneAddress);
router.post('/',addressController.createNewAddress);
router.put('/:id',addressController.updateAddress);
router.delete('/:id',addressController.deleteAddress);
module.exports = router;