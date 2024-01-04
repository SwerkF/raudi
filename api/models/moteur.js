const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Moteur = sequelize.define('moteur', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    puissance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Moteur;