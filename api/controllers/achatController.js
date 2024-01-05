const Achat = require('../models/achat'); // Assurez-vous que le chemin est correct
const Vehicule = require('../models/vehicule');
const Modele = require('../models/modele');
const options = require('../models/options');


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
        // get all achats with vehicule and modele and option
        const achats = await Achat.findAll({
            include: [
                {
                    model: Vehicule,
                    include: [
                        {
                            model: options,
                        },
                        {
                            model: Modele,
                        },
                    ],
                },
            ],
        });
        res.json(achats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAchatById = async (req, res) => {
    try {
const achat = await Achat.findByPk(req.params.achatId, {
                    include: [
                        {
                            model: Vehicule,
                            include: [
                                {
                                    model: Modele,
                                    model: options,
                                },
                            ],
                        },
                    ],
                });
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
