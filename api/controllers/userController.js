const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
    try {
        const { nom, prenom, email, motdepasse, adresse, ville, cp, role_id } = req.body;
        if (!nom || !prenom || !email || !motdepasse) {
            return res.status(400).json({ error: "Données manquantes" });
        }

        // Vérifier si l'utilisateur existe déjà
        const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (result.length > 0) {
            return res.status(409).json({ error: "Utilisateur déjà existant" });
        }

        // Hasher le mot de passe
        const hashMDP = await bcrypt.hash(motdepasse, 10);

        // Insérer l'utilisateur dans la base de données
        await db.query("INSERT INTO user (nom, prenom, email, motdepasse, adresse, ville, cp, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nom, prenom, email, hashMDP, adresse, ville, cp, role_id]);
        // Générer un token JWT
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


exports.login = async (req, res) => {
    try {
        // Récupérer email et mot de passe depuis req.body
        const { email, motdepasse } = req.body;

        // Vérifier si l'utilisateur existe
        const result = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (result.length === 0) {
            return res.status(401).json({ error: "Utilisateur non existant" });
        }

        const user = result[0];

        // Comparer le mot de passe fourni avec celui en base de données
        const isPasswordCorrect = await bcrypt.compare(motdepasse, user.motdepasse);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        if (user.role === "admin") {
            const allUsers = await db.query('SELECT * FROM user');
            res.json({ token, users: allUsers });
        } else {
            res.json({ token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
