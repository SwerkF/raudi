const Achat = require('../models/achat'); // Assurez-vous que le chemin est correct

exports.createAchat = async (req, res) => {
    try {
        const achat = await Achat.create(req.body);
        res.status(201).json(achat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAchats = async (req, res) => {
    try {
        const achats = await Achat.findAll();
        res.json(achats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAchatById = async (req, res) => {
    try {
        const achat = await Achat.findByPk(req.params.achatId);
        if (!achat) {
            return res.status(404).json({ error: 'Achat non trouvé' });
        }
        res.json(achat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAchat = async (req, res) => {
    try {
        const achat = await Achat.findByPk(req.params.achatId);
        if (!achat) {
            return res.status(404).json({ error: 'Achat non trouvé' });
        }
        await achat.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
