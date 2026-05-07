import { Router } from "express";
import { videoController } from "../controllers/video.controller";

const router = Router();

router.post("/", videoController.create);
router.get("/", videoController.findAll);
router.delete("/:id", videoController.delete);

export default router;