const express = require('express');
const achatController = require('../controllers/achatController');
const router = express.Router();
const middleware = require('../middlewares/middleware');

router.post('/', middleware.checkToken, achatController.createAchat);
router.get('/', middleware.isAdminOrComptable, achatController.getAllAchats);
router.get('/:achatId', middleware.isAdminOrComptable, achatController.getAchatById);
router.delete('/:achatId', middleware.isAdminOrComptable, achatController.deleteAchat);

module.exports = router;
