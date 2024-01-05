const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const user = require('./user');
const vehicule = require('./vehicule');

const Achat = sequelize.define('achat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date_achat: {
        type: Sequelize.DATE,
        allowNull: false
    },
    prix: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

Achat.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(Achat, { foreignKey: 'user_id' });

Achat.belongsTo(vehicule, { foreignKey: 'vehicule_id' });
vehicule.hasMany(Achat, { foreignKey: 'vehicule_id' });

module.exports = Achat;
