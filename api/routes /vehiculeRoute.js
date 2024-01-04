const express = require('express');
const vehiculeController = require('../controllers/vehiculeController');
const router = express.Router();

router.post('/vehicules', vehiculeController.createVehicule);
router.get('/vehicules', vehiculeController.getAllVehicules);
router.get('/vehicules/:vehiculeId', vehiculeController.getVehiculeById);
router.put('/vehicules/:vehiculeId', vehiculeController.updateVehicule);
router.delete('/vehicules/:vehiculeId', vehiculeController.deleteVehicule);

module.exports = router;
