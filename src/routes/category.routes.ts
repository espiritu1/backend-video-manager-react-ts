import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

const router = Router();

router.post("/", categoryController.create);
router.get("/", categoryController.findAll);
router.delete("/:id", categoryController.delete);

export default router;