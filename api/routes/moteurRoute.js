const express = require('express');
const router = express.Router();
const modeleController = require('../controllers/modeleController');

router.post('/', modeleController.createModele);
router.get('/', modeleController.getAllModeles);
router.get('/:modeleId', modeleController.getModeleById);
router.put('/:modeleId', modeleController.updateModele);
router.delete('/:modeleId', modeleController.deleteModele);

module.exports = router;