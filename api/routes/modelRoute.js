const express = require('express');
const modeleController = require('../controllers/modeleController');
const router = express.Router();

router.post('/modeles', modeleController.createModele);
router.get('/modeles', modeleController.getAllModeles);
router.get('/modeles/:modeleId', modeleController.getModeleById);
router.put('/modeles/:modeleId', modeleController.updateModele);
router.delete('/modeles/:modeleId', modeleController.deleteModele);

module.exports = router;
