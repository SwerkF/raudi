const express = require('express');
const router = express.Router();
const moteurController = require('../controllers/moteurController');

router.get('/', moteurController.getAllMoteurs);
router.get('/:id', moteurController.getMoteurById);
router.post('/', moteurController.createMoteur);
router.put('/:id', moteurController.updateMoteur);
router.delete('/:id', moteurController.deleteMoteur);

module.exports = router;