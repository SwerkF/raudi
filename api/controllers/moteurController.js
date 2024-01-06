const Moteur = require('../models/moteur');

exports.createMoteur = async (req, res) => {
    try {
        const moteur = await Moteur.create(req.body);
        res.status(201).json(moteur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllMoteurs = async (req, res) => {
    try {
        const moteurs = await Moteur.findAll();
        res.json(moteurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getMoteurById = async (req, res) => {
    try {
        const moteur = await Moteur.findByPk(req.params.moteurId);
        if (!moteur) {
            return res.status(404).json({ error: 'Moteur non trouvé' });
        }
        res.json(moteur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateMoteur = async (req, res) => {
    try {
        const moteur = await Moteur.findByPk(req.params.moteurId);
        if (!moteur) {
            return res.status(404).json({ error: 'Moteur non trouvé' });
        }
        await moteur.update(req.body);
        res.json(moteur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteMoteur = async (req, res) => {
    try {
        const moteur = await Moteur.findByPk(req.params.moteurId);
        if (!moteur) {
            return res.status(404).json({ error: 'Moteur non trouvé' });
        }
        await moteur.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

