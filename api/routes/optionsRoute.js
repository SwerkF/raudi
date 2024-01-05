const express = require('express');
const optionsController = require('../controllers/optionsController');
const router = express.Router();
const middleware = require('../middlewares/middleware');

router.post('/', middleware.isAdmin ,optionsController.createOption);
router.get('/', optionsController.getAllOptions);
router.get('/:optionId', middleware.isAdmin, optionsController.getOptionById);
//router.put('/options/:optionId', optionsController.updateOption);
router.delete('/:optionId', optionsController.deleteOption);

module.exports = router;
