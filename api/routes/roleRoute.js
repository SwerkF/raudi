const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const middleware = require('../middlewares/middleware');

router.post('/', middleware.isAdmin, roleController.createRole);
router.get('/', middleware.isAdmin , roleController.getAllRoles);
router.get('/:roleId',middleware.isAdmin, roleController.getRoleById);
router.put('/:roleId', middleware.isAdmin, roleController.updateRole);
router.delete('/:roleId', middleware.isAdmin, roleController.deleteRole);

module.exports = router;