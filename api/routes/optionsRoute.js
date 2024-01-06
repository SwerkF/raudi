const express = require('express');
const optionsController = require('../controllers/optionsController');
const router = express.Router();

router.post('/', optionsController.createOption);
router.get('/', optionsController.getAllOptions);
router.get('/:optionId', optionsController.getOptionById);
//router.put('/options/:optionId', optionsController.updateOption);
router.delete('/:optionId', optionsController.deleteOption);

module.exports = router;
