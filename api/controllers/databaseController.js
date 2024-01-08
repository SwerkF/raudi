const sequelize = require('../database/database');
const Moteur = require('../models/moteur');
const Role = require('../models/role');

exports.createDatabase = (req, res, next) => {
    sequelize.sync({ force: true })
        .then(() => {
            res.status(200).json({ message: 'Database created' });
        })
        .catch(error => {
            res.status(400).json({ error: error });
        });
}

exports.fillDatabase = async (req, res, next) => {
    try {
        // Create roles
        const client = await Role.create({ nom: 'Client' });
        const comptable = await Role.create({ nom: 'Comptable' });
        const admin = await Role.create({ nom: 'Admin' });

        // Create moteurs
        const moteur1 = await Moteur.create({ type: '1.2 PureTech 110 S&S BVM6', puissance: 1800 });
        
        res.status(200).json({ message: 'Database filled' });
    } catch (error) {
        res.status(400).json({ error: error });
    }

};