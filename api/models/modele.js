const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const Moteur = require('./moteur');

const Modele = sequelize.define('modele', {
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
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nombre_portes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre_places: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    prix: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taille: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vitesse_max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    couleur: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_fabrication: {
        type: Sequelize.DATE,
        allowNull: false
    },

});

Modele.belongsTo(Moteur, { foreignKey: 'moteur_id' });
Moteur.hasMany(Modele, { foreignKey: 'moteur_id' });

module.exports = Modele;