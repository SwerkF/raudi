const express = require('express');
const modeleController = require('../controllers/modeleController');
const middleware = require('../middlewares/middleware');
const router = express.Router();

router.post('/', middleware.isAdmin, modeleController.createModele);
router.get('/', modeleController.getAllModeles);
router.get('/:modeleId', modeleController.getModeleById);
router.put('/:modeleId', middleware.isAdmin, modeleController.updateModele);
router.delete('/:modeleId', middleware.isAdmin, modeleController.deleteModele);


module.exports = router;
