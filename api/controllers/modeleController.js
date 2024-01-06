const Modele = require('../models/modele'); // Assurez-vous que le chemin est correct
const Moteur = require('../models/moteur');
const fs = require('fs');

exports.createModele = async (req, res) => {
    try {
        // Extract other form fields from req.body
        let { nom, prix, description, nombre_portes, nombre_places, taille, vitesse_max, couleur, moteur_id } = req.body;

        // Check if model exists in the database
        let moteur = await Moteur.findByPk(moteur_id);
        if (!moteur) {
            return res.status(404).json({ error: 'Moteur non trouvé' });
        }

        // Check if model already exists in the database
        let modele = await Modele.findOne({
            where: {
                nom: nom,
            },
        });

        if (modele) {
            return res.status(409).json({ error: 'Modèle déjà existant' });
        }
        
        let imageName = req.file.filename

        modele = await Modele.create({
            nom: nom,
            prix: prix,
            description: description,
            nombre_portes: nombre_portes,
            nombre_places: nombre_places,
            taille: taille,
            vitesse_max: vitesse_max,
            couleur: couleur,
            moteur_id: moteur_id,
            image: imageName, 
        });

        
        res.status(200).json(modele);
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
    // same as createModele 
    try {
        let { nom, prix, description, nombre_portes, nombre_places, taille, vitesse_max, couleur, moteur_id } = req.body;

        let moteur = await Moteur.findByPk(moteur_id);
        if (!moteur) {
            return res.status(404).json({ error: 'Moteur non trouvé' });
        }

        let modele = await Modele.findByPk(req.params.modeleId);

        if (!modele) {
            return res.status(404).json({ error: 'Modèle non trouvé' });
        }

        if(req.file) 
        {
            modele = await modele.update({
                nom: nom,
                prix: prix,
                description: description,
                nombre_portes: nombre_portes,
                nombre_places: nombre_places,
                taille: taille,
                vitesse_max: vitesse_max,
                couleur: couleur,
                moteur_id: moteur_id,
                image: req.file.filename, 
            });
        } else {
            modele = await modele.update({
                nom: nom,
                prix: prix,
                description: description,
                nombre_portes: nombre_portes,
                nombre_places: nombre_places,
                taille: taille,
                vitesse_max: vitesse_max,
                couleur: couleur,
                moteur_id: moteur_id,
            });
        }


        res.status(200).json(modele);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteModele = async (req, res) => {
    try {
        const modele = await Modele.findByPk(req.params.modeleId);
        if (!modele) {
            return res.status(404).json({ error: 'Modèle non trouvé' });
        }
        console.log(modele.image)
        fs.unlinkSync(`src/${modele.image}`)
        await modele.destroy();

        // Delete image from uploads folder

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
