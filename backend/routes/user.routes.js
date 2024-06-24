const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user in the application. This will create a new user record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               email:
 *                 type: string
 *                 description: The email address for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *               role:
 *                 type: string
 *                 description: The role of the new user (e.g., "client", "photographer").
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
// Routes pour l'enregistrement d'un nouvel utilisateur
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Login an existing user into the application. This will authenticate the user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token provided upon successful login.
 *       401:
 *         description: Unauthorized
 */
// Routes pour la connexion d'un utilisateur
router.post("/login", loginUser);

module.exports = router;
