const express = require('express');
const vehiculeController = require('../controllers/vehiculeController');
const router = express.Router();

router.post('/', vehiculeController.createVehicule);
router.get('/', vehiculeController.getAllVehicules);
router.get('/:vehiculeId', vehiculeController.getVehiculeById);
router.put('/:vehiculeId', vehiculeController.updateVehicule);
router.delete('/:vehiculeId', vehiculeController.deleteVehicule);

module.exports = router;
