const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/property.controller');

router.get('/',propertyController.getProperty);
router.get('/:id',propertyController.getOneProperty);
router.post('/',propertyController.createNewProperty);
router.put('/:id',propertyController.updateProperty);
router.patch('/:id',propertyController.likeProperty);
router.delete('/:id',propertyController.deleteProperty);
module.exports = router;