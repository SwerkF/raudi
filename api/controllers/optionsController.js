const Options = require('../models/options'); // Assurez-vous que le chemin est correct

exports.createOption = async (req, res) => {
    try {
        const option = await Options.create(req.body);
        res.status(201).json(option);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllOptions = async (req, res) => {
    try {
        const options = await Options.findAll();
        res.json(options);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOptionById = async (req, res) => {
    try {
        const option = await Options.findByPk(req.params.optionId);
        if (!option) {
            return res.status(404).json({ error: 'Option non trouvée' });
        }
        res.json(option);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const option = await Options.findByPk(req.params.optionId);
        if (!option) {
            return res.status(404).json({ error: 'Option non trouvée' });
        }
        await option.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
