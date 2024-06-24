const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  getAllPhotographers,
  getAllValidPhotographers,
  getPhotographer,
  addPhotographer,
  editPhotographer,
  deletePhotographer,
} = require("../controllers/photographer.controller");

/**
 * @swagger
 * tags:
 *   name: Photographers
 *   description: Operations related to managing photographers in the freelance photography agency application.
 */

/**
 * @swagger
 * /api/photographers:
 *   get:
 *     summary: Retrieve all photographers
 *     tags: [Photographers]
 *     description: Retrieve a list of all freelance photographers registered in the application.
 *     responses:
 *       200:
 *         description: A list of photographers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The photographer ID.
 *                   name:
 *                     type: string
 *                     description: The name of the photographer.
 *                   city:
 *                     type: string
 *                     description: The city where the photographer is based.
 *                   country:
 *                     type: string
 *                     description: The country where the photographer is based.
 *                   price:
 *                     type: number
 *                     description: The price for the photographer's services.
 *                   avatarPath:
 *                     type: string
 *                     description: The path to the photographer's avatar image.
 *             examples:
 *               example:
 *                 value: [
 *                   {
 *                     "id": "60d0fe4f5311236168a109ca",
 *                     "name": "John Doe",
 *                     "city": "Paris",
 *                     "country": "France",
 *                     "price": 150,
 *                     "avatarPath": "/uploads/avatars/johndoe.jpg"
 *                   }
 *                 ]
 */
// Routes pour récupérer tout les profils des photographes
router.get("/", getAllPhotographers);

// Routes pour récupérer tous les profils de photographes dont les informations sont valides
router.get("/valid", getAllValidPhotographers);
/**
 * @swagger
 * /api/photographers/{id}:
 *   get:
 *     summary: Retrieve photographer by ID
 *     tags: [Photographers]
 *     description: Retrieve detailed information about a specific photographer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the photographer.
 *     responses:
 *       200:
 *         description: Photographer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The photographer ID.
 *                 name:
 *                   type: string
 *                   description: The name of the photographer.
 *                 city:
 *                   type: string
 *                   description: The city where the photographer is based.
 *                 country:
 *                   type: string
 *                   description: The country where the photographer is based.
 *                 price:
 *                   type: number
 *                   description: The price for the photographer's services.
 *                 avatarPath:
 *                   type: string
 *                   description: The path to the photographer's avatar image.
 *             examples:
 *               example:
 *                 value:
 *                   {
 *                     "id": "60d0fe4f5311236168a109ca",
 *                     "name": "John Doe",
 *                     "city": "Paris",
 *                     "country": "France",
 *                     "price": 150,
 *                     "avatarPath": "/uploads/avatars/johndoe.jpg"
 *                   }
 */
// Routes pour récupérer les infos d'un seul photographe via son ID
router.get("/:id", getPhotographer);

/**
 * @swagger
 * /api/photographers:
 *   post:
 *     summary: Add a new photographer
 *     tags: [Photographers]
 *     description: Add a new freelance photographer to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatarPath:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image file for the photographer.
 *               name:
 *                 type: string
 *                 description: The name of the photographer.
 *               city:
 *                 type: string
 *                 description: The city where the photographer is based.
 *               country:
 *                 type: string
 *                 description: The country where the photographer is based.
 *               price:
 *                 type: number
 *                 description: The price for the photographer's services.
 *     responses:
 *       200:
 *         description: Photographer added successfully
 *       500:
 *         description: Server error
 */
// Route pour ajouter un photographe
router.post("/", upload.single("avatarPath"), addPhotographer);

/**
 * @swagger
 * /api/photographers/{id}:
 *   put:
 *     summary: Update a photographer by ID
 *     tags: [Photographers]
 *     description: Update the details of an existing photographer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the photographer.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatarPath:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image file for the photographer.
 *               name:
 *                 type: string
 *                 description: The name of the photographer.
 *               city:
 *                 type: string
 *                 description: The city where the photographer is based.
 *               country:
 *                 type: string
 *                 description: The country where the photographer is based.
 *               price:
 *                 type: number
 *                 description: The price for the photographer's services.
 *     responses:
 *       200:
 *         description: Photographer updated successfully
 *       404:
 *         description: Photographer not found
 *       500:
 *         description: Server error
 */
// Route pour modifier un profil de photographe via son ID
router.put("/:id", upload.single("avatarPath"), editPhotographer);

/**
 * @swagger
 * /api/photographers/{id}:
 *   delete:
 *     summary: Delete a photographer by ID
 *     tags: [Photographers]
 *     description: Delete an existing photographer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the photographer.
 *     responses:
 *       200:
 *         description: Photographer deleted successfully
 *       404:
 *         description: Photographer not found
 *       500:
 *         description: Server error
 */
// Route pour supprimer un profil de photographe via son ID
router.delete("/:id", deletePhotographer);

module.exports = router;
