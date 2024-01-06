const express = require('express');
const vehiculeController = require('../controllers/vehiculeController');
const middleware = require('../middlewares/middleware');
const router = express.Router();

router.post('/', vehiculeController.createVehicule);
router.get('/', middleware.isAdmin, vehiculeController.getAllVehicules);
router.get('/:vehiculeId', vehiculeController.getVehiculeById);
router.put('/:vehiculeId',  middleware.isAdmin, vehiculeController.updateVehicule);
router.delete('/:vehiculeId', middleware.isAdmin, vehiculeController.deleteVehicule);

module.exports = router;
