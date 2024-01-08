const Vehicule = require('../models/vehicule'); 

exports.createVehicule = async (req, res) => {
    try {
        const vehicule = await Vehicule.create(req.body);
        res.status(201).json(vehicule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllVehicules = async (req, res) => {
    try {
        const vehicules = await Vehicule.findAll();
        res.json(vehicules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVehiculeById = async (req, res) => {
    try {
        const vehicule = await Vehicule.findByPk(req.params.vehiculeId);
        if (!vehicule) {
            return res.status(404).json({ error: 'Véhicule non trouvé' });
        }
        res.json(vehicule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVehicule = async (req, res) => {
    try {
        const vehicule = await Vehicule.findByPk(req.params.vehiculeId);
        if (!vehicule) {
            return res.status(404).json({ error: 'Véhicule non trouvé' });
        }
        await vehicule.update(req.body);
        res.json(vehicule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteVehicule = async (req, res) => {
    try {
        const vehicule = await Vehicule.findByPk(req.params.vehiculeId);
        if (!vehicule) {
            return res.status(404).json({ error: 'Véhicule non trouvé' });
        }
        await vehicule.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
