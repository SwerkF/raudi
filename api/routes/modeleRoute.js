const express = require('express');
const modeleController = require('../controllers/modeleController');
const router = express.Router();

router.post('/', modeleController.createModele);
router.get('/', modeleController.getAllModeles);
router.get('/:modeleId', modeleController.getModeleById);
router.put('/:modeleId', modeleController.updateModele);
router.delete('/:modeleId', modeleController.deleteModele);


module.exports = router;
