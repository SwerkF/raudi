const jwt = require('jsonwebtoken');
const connection = require('../database/database');
require('dotenv').config();

exports.checkToken = (req, res, next) => {
    // Récupération du bearer token
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            console.log(decodedToken)
            next();
        }
    });
};

exports.isAdmin = (req, res, next) => {
    // Récupération du bearer token
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.TOKENSECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            const emailUser = decodedToken.email;
            // Connexion à la base de données
            connection.query('SELECT role.nom as nom FROM user INNER JOIN role ON role.id = role_id WHERE email = ?', emailUser, (err, results) => {
                if (err) {
                    res.status(500).json({ flash: err.message });
                } else {
                    if (results[0].nom === "Admin") {
                        next();
                    } else {
                        res.status(401).json({ flash: "Invalid token !" });
                    }
                }
            });
        }
    });
}

