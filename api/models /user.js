const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const role = require('./role');

const User = sequelize.define('user', {
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
    prenom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code_postal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ville: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

User.belongsTo(role, { foreignKey: 'role_id' });
role.hasMany(User, { foreignKey: 'role_id' });

module.exports = User;