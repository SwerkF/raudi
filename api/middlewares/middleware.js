const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
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

exports.isAdmin = async (req, res, next) => {
    // Récupération du bearer token
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.SECRETKEY, async (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            // get user with email
            const email = decodedToken.email;
            const user = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role,
                    attributes: ['id', 'nom'] // You can specify the attributes you want to include for the role
                }]
            });

            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            if (user.role.nom !== 'Admin') {
                return res.status(401).json({ error: 'Vous n\'avez pas les droits pour effectuer cette action' });
            }
            console.log("All good")
            next();

        }
    });
    
}

exports.isAdminOrComptable = async (req, res, next) => {
    console.log(req.headers.authorization)
    // Récupération du bearer token
    const token = req.headers.authorization.split(" ")[1];
    // Vérification du token
    jwt.verify(token, process.env.SECRETKEY, async (err, decodedToken) => {
        if (err) {
            res.status(401).json({ flash: "Invalid token !" });
        } else {
            // get user with email
            const email = decodedToken.email;
            const user = await User.findOne({
                where: { email: email },
                include: [{
                    model: Role,
                    attributes: ['id', 'nom'] // You can specify the attributes you want to include for the role
                }]
            });

            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            console.log(user)
            if (user.role.nom !== 'Admin' && user.role.nom !== 'Comptable') {
                return res.status(401).json({ error: 'Vous n\'avez pas les droits pour effectuer cette action' });
            }

            next();

        }
    });
}
