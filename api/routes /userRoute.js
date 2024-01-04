const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.createUser); // Créer un utilisateur
router.get('/users', userController.getAllUsers); // Obtenir tous les utilisateurs
router.get('/users/:userId', userController.getUserById); // Obtenir un utilisateur par ID
router.put('/users/:userId', userController.updateUser); // Mettre à jour un utilisateur
router.delete('/users/:userId', userController.deleteUser); // Supprimer un utilisateur

module.exports = router;
