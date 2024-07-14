import express, { Router } from "express";
import photographerRoutes from "./photographer.routes";
import mediaRoutes from "./media.routes";
import userRoutes from "./user.routes";

const router: Router = express.Router();

router.use("/photographes", photographerRoutes);
router.use("/medias", mediaRoutes);
router.use("/user", userRoutes);

export default router;
