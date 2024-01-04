const sequelize = require('../database/database');

exports.createDatabase = (req, res, next) => {
    sequelize.sync({ force: true })
        .then(() => {
            res.status(200).json({ message: 'Database created' });
        })
        .catch(error => {
            res.status(400).json({ error: error });
        });
}