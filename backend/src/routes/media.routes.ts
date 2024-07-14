import express, { Router } from "express";
import { uploadMiddleware } from "../middleware/upload.middleware";
import {
  uploadMedia,
  getMediasByPhotographerId,
  deleteMedia,
  updateMedia,
} from "../controllers/media.controller";

const router: Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Medias
 *   description: Operations related to managing media files in the freelance photography agency application.
 */

/**
 * @swagger
 * /api/medias/{photographerId}:
 *   get:
 *     summary: Retrieve medias by photographer ID
 *     tags: [Medias]
 *     description: Retrieve all media files associated with a specific photographer by their ID.
 *     parameters:
 *       - in: path
 *         name: photographerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the photographer.
 *     responses:
 *       200:
 *         description: A list of media files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The media ID.
 *                   title:
 *                     type: string
 *                     description: The title of the media.
 *                   filePath:
 *                     type: string
 *                     description: The path to the media file.
 *                   likes:
 *                     type: number
 *                     description: The number of likes the media has received.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date the media was uploaded.
 *             examples:
 *               example:
 *                 value: [
 *                   {
 *                     "id": "60d0fe4f5311236168a109ca",
 *                     "title": "Sunset in Paris",
 *                     "filePath": "/uploads/media/sunset.jpg",
 *                     "likes": 150,
 *                     "date": "2021-06-23T18:25:43.511Z"
 *                   }
 *                 ]
 */
// Route pour récupérer les médias par photographerId
router.get("/:photographerId", getMediasByPhotographerId);

/**
 * @swagger
 * /api/medias:
 *   post:
 *     summary: Upload a media file
 *     tags: [Medias]
 *     description: Upload a new media file to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the media.
 *               photographerId:
 *                 type: string
 *                 description: The ID of the photographer uploading the media.
 *               filePath:
 *                 type: string
 *                 format: binary
 *                 description: The media file to upload.
 *               likes:
 *                 type: number
 *                 description: The number of likes the media has received.
 *     responses:
 *       201:
 *         description: Media uploaded successfully
 *       500:
 *         description: Server error
 */
// Route pour upload un fichier media
router.post("/", uploadMiddleware.single("filePath"), uploadMedia);

/**
 * @swagger
 * /api/medias/{id}:
 *   patch:
 *     summary: Update a media file by ID
 *     tags: [Medias]
 *     description: Update the title and likes of an existing media file by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the media.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the media.
 *               likes:
 *                 type: number
 *                 description: The new number of likes for the media.
 *     responses:
 *       200:
 *         description: Media updated successfully
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
// Route pour mettre à jour un fichier media via son ID
router.patch("/:id", updateMedia);

/**
 * @swagger
 * /api/medias/{id}:
 *   delete:
 *     summary: Delete a media file by ID
 *     tags: [Medias]
 *     description: Delete an existing media file by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the media.
 *     responses:
 *       200:
 *         description: Media deleted successfully
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
// Route pour supprimer un fichier media via son ID
router.delete("/:id", deleteMedia);

export default router;
