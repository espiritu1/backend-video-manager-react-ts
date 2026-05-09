import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import multer from "multer";
import { readFileSync } from "fs";
import { join } from "path";
import categoryRoutes from "./routes/category.routes";
import videoRoutes from "./routes/video.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app = express();

const swaggerDocument = JSON.parse(readFileSync(join(process.cwd(), "openapi.json"), "utf-8"));

app.use(cors());
app.use(express.json());

const upload = multer({ dest: join(process.cwd(), "assets", "backend", "temp") });

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/openapi.json", (_req, res) => {
  res.json(swaggerDocument);
});

app.use("/api/categories", categoryRoutes);
app.use("/api/videos", upload.fields([
  { name: "video", maxCount: 1 },
  { name: "miniatura", maxCount: 1 }
]), videoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;