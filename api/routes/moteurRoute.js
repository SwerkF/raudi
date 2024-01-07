const express = require('express');
const router = express.Router();
const moteurController = require('../controllers/moteurController');
const middleware = require('../middlewares/middleware');

router.get('/', moteurController.getAllMoteurs);
router.get('/:moteurId', moteurController.getMoteurById);
router.post('/', middleware.isAdmin, moteurController.createMoteur);
router.put('/:moteurId',middleware.isAdmin, moteurController.updateMoteur);
router.delete('/:moteurId',middleware.isAdmin, moteurController.deleteMoteur);

module.exports = router;