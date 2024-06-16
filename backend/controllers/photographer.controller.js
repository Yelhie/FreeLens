const PhotographerModel = require("../models/photographer.model");

//Ajoute un profil de photographe
module.exports.addPhotographer = async (req, res) => {
  try {
    const newPhotographes = await PhotographerModel.create({
      name: req.body.name,
      avatarPath: req.file ? req.file.path : null,
      city: req.body.city,
      country: req.body.country,
      price: req.body.price,
    });
    res.status(200).json(newPhotographes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout d'un nouveau profil de photographe'",
      error: error.message,
    });
  }
};
