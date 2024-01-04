const Modele = require('../models/modele'); // Assurez-vous que le chemin est correct

exports.createModele = async (req, res) => {
    try {
        const modele = await Modele.create(req.body);
        res.status(201).json(modele);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllModeles = async (req, res) => {
    try {
        const modeles = await Modele.findAll();
        res.json(modeles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getModeleById = async (req, res) => {
    try {
        const modele = await Modele.findByPk(req.params.modeleId);
        if (!modele) {
            return res.status(404).json({ error: 'Modèle non trouvé' });
        }
        res.json(modele);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateModele = async (req, res) => {
    try {
        const modele = await Modele.findByPk(req.params.modeleId);
        if (!modele) {
            return res.status(404).json({ error: 'Modèle non trouvé' });
        }
        await modele.update(req.body);
        res.json(modele);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteModele = async (req, res) => {
    try {
        const modele = await Modele.findByPk(req.params.modeleId);
        if (!modele) {
            return res.status(404).json({ error: 'Modèle non trouvé' });
        }
        await modele.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
