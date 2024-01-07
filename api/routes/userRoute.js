const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');   

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers); 
router.get('/me', userController.verifyConnection);
router.get('/:userId', userController.getUserById); 
router.put('/:userId', userController.updateUser); 
router.delete('/:userId', userController.deleteUser); 
router.put('/:userId/password', userController.updateUserPassword);

module.exports = router;