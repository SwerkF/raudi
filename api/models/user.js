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
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: true
    },
    code_postal: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    ville: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telephone: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
});

User.belongsTo(role, { foreignKey: 'role_id' });
role.hasMany(User, { foreignKey: 'role_id' });

module.exports = User;