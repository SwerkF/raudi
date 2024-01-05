const Role = require('../models/role'); // Assurez-vous que le chemin est correct

exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({ error: 'Role non trouvé' });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({ error: 'Role non trouvé' });
        }
        await role.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
