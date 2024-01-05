const express = require('express');
const achatController = require('../controllers/achatController');
const router = express.Router();

router.post('/', achatController.createAchat);
router.get('/', achatController.getAllAchats);
router.get('/:achatId', achatController.getAchatById);
router.delete('/:achatId', achatController.deleteAchat);

module.exports = router;
