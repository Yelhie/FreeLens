import express, { Router } from "express";
import { uploadMiddleware } from "../middleware/upload.middleware";
import {
  getAllClients,
  getClientByID,
  createClient,
  updateClientByID,
  deleteClientByID,
} from "../controllers/client.controller";

const router: Router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientByID);
router.post("/", uploadMiddleware.single("avatar"), createClient);
router.put("/:id", updateClientByID);
router.delete("/:id", deleteClientByID);

export default router;
