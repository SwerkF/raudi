const data = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
require('dotenv').config();

exports.register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // vérifier si l'utilisateur existe déjà
        user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            console.log('L\'utilisateur existe déjà');
            return res.status(401).json({ error: 'L\'utilisateur existe déjà' });
        
        }

        // Créer un nouvel utilisateur avec le role 1 (User)
        const newUser = await User.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hashedPassword,
            role_id: 1
        });

        // Créer un token
        const token = jwt.sign(
            { email: newUser.email },
            process.env.SECRETKEY,
            { expiresIn: '24h' }
        );

        // Envoyer la réponse
        res.status(200).json({
            userId: newUser.id,
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        // vérifier si l'utilisateur existe déjà
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        // Vérifier si le mot de passe est correct
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            console.log('Mot de passe incorrect');
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        // Créer un token
        const token = jwt.sign(
            { email: user.email },
            process.env.SECRETKEY,
            { expiresIn: '24h' }
        );
        // Envoyer la réponse
        res.status(200).json({
            userId: user.id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyConnection = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
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

        res.status(200).json({
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
