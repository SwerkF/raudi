const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');   

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers); // Obtenir tous les utilisateurs
router.get('/me', userController.verifyConnection); // Obtenir un utilisateur par token
router.get('/:userId', userController.getUserById); // Obtenir un utilisateur par ID
router.put('/:userId', userController.updateUser); // Mettre à jour un utilisateur
router.delete('/:userId', userController.deleteUser); // Supprimer un utilisateur

module.exports = router;