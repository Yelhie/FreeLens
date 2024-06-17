const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  getAllPhotographers,
  addPhotographer,
} = require("../controllers/photographer.controller");

// Routes pour récupérer tout les photographes
router.get("/", getAllPhotographers);

// Route pour ajouter un photographe
router.post("/", upload.single("avatarPath"), addPhotographer);

module.exports = router;
