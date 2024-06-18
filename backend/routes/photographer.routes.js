const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  getAllPhotographers,
  getPhotographer,
  addPhotographer,
  editPhotographer,
  deletePhotographer,
} = require("../controllers/photographer.controller");

// Routes pour récupérer tout les photographes
router.get("/", getAllPhotographers);

// Routes pour récupérer les infos d'un seul photographe via son ID
router.get("/:id", getPhotographer);

// Route pour ajouter un photographe
router.post("/", upload.single("avatarPath"), addPhotographer);

// Route pour modifier un profil de photographe via son ID
router.put("/:id", upload.single("avatarPath"), editPhotographer);

// Route pour supprimer un profil de photographe via son ID
router.delete("/:id", deletePhotographer);

module.exports = router;
