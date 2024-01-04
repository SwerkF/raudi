const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');

router.get('/', databaseController.createDatabase); 

module.exports = router;