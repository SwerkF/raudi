const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const modele = require('./modele');
const options = require('./options');

const Vehicule = sequelize.define('vehicule', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

Vehicule.belongsTo(modele, { foreignKey: 'modele_id' });
modele.hasMany(Vehicule, { foreignKey: 'modele_id' });

Vehicule.belongsToMany(options, { through: 'vehicule_options', foreignKey: 'vehicule_id' });
options.belongsToMany(Vehicule, { through: 'vehicule_options', foreignKey: 'options_id' });

module.exports = Vehicule;