const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');   
router.post('/register', userController.register, userController.login);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers); // Obtenir tous les utilisateurs
router.get('/users/:userId', userController.getUserById); // Obtenir un utilisateur par ID
router.put('/users/:userId', userController.updateUser); // Mettre à jour un utilisateur
router.delete('/users/:userId', userController.deleteUser); // Supprimer un utilisateur

module.exports = router;