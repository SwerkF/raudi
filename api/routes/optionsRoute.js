const express = require('express');
const optionsController = require('../controllers/optionsController');
const router = express.Router();

router.post('/options', optionsController.createOption);
router.get('/options', optionsController.getAllOptions);
router.get('/options/:optionId', optionsController.getOptionById);
//router.put('/options/:optionId', optionsController.updateOption);
router.delete('/options/:optionId', optionsController.deleteOption);

module.exports = router;
