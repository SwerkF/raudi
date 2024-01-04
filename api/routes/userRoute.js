const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');   

router.post('/register', userController.register, userController.login);
router.post('/login', userController.login);

module.exports = router;