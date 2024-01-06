const Achat = require('../models/achat'); // Assurez-vous que le chemin est correct
const Modele = require('../models/modele');
const Vehicule = require('../models/vehicule');
const Options = require('../models/options');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createAchat = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    /*
    modele_id: '1',
  options: [
    {
      id: 2,
      nom: 'Climatisation',
      prix: 2500,
      createdAt: '2024-01-05T14:07:49.000Z',
      updatedAt: '2024-01-05T14:07:49.000Z'
    },
    {
      id: 1,
      nom: 'Siège chauffant',
      prix: 500,
      createdAt: '2024-01-05T14:07:49.000Z',
      updatedAt: '2024-01-05T14:07:49.000Z'
    }
  ],
  adresse: 'fefef',
  cp: 'efef',
  ville: 'efef',
  tel: 'efefef'
  */

  // Check if model exists in the database
    const modele = await Modele.findByPk(req.body.modele_id);
    if (!modele) {
        return res.status(404).json({ error: 'Modèle non trouvé' });
    }

    // Add modele to vehicule
    const vehicule = await Vehicule.create({
        modele_id: req.body.modele_id,
    });

    // check if options exists in db, if not return error
    const options = await Options.findAll({
        where: {
            id: req.body.options.map(option => option.id),
        },
    });

    if (options.length !== req.body.options.length) {
        return res.status(404).json({ error: 'Options non trouvées' });
    }
    
    // Add options to vehicule
    await vehicule.addOptions(options);

    // decode token, get email and update find user by email
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    const emailUser = decodedToken.email;

    const user = await User.findOne({
        where: {
            email: emailUser,
        },
    });

    if(!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.update({
        adresse: req.body.adresse,
        cp: req.body.cp,
        ville: req.body.ville,
        telephone: req.body.tel,
    });

    // Create achat
    const achat = await Achat.create({
        user_id: user.id,
        vehicule_id: vehicule.id,
        date_achat: new Date(),
    });

    res.status(200).send('Achat validé')


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
