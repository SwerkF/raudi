const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Options = sequelize.define('options', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prix: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Options;