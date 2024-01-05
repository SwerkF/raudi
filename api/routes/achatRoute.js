const express = require('express');
const achatController = require('../controllers/achatController');
const router = express.Router();

router.post('/achats', achatController.createAchat);
router.get('/achats', achatController.getAllAchats);
router.get('/achats/:achatId', achatController.getAchatById);
router.delete('/achats/:achatId', achatController.deleteAchat);

module.exports = router;
