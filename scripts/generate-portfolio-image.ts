import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

const width = 500;
const height = 280;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, "#1a1a2e");
gradient.addColorStop(1, "#16213e");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Header bar
ctx.fillStyle = "#0f3460";
ctx.fillRect(0, 0, width, 40);

// Title
ctx.fillStyle = "#e94560";
ctx.font = "bold 18px Arial";
ctx.fillText("Video Manager API", 15, 27);

// Subtitle
ctx.fillStyle = "#fff";
ctx.font = "12px Arial";
ctx.fillText("REST API with Clean Architecture", 15, 55);

// Technologies section
ctx.fillStyle = "#e94560";
ctx.font = "bold 12px Arial";
ctx.fillText("TECNOLOGÍAS", 20, 80);

ctx.fillStyle = "#a0a0a0";
ctx.font = "11px Arial";
ctx.fillText("Bun 1.2.22 • Express • TypeScript", 20, 95);
ctx.fillText("Prisma 7.8.0 • PostgreSQL • Zod", 20, 110);
ctx.fillText("OpenAPI 3.0.3 • Swagger UI", 20, 125);

// Endpoints section
ctx.fillStyle = "#e94560";
ctx.font = "bold 12px Arial";
ctx.fillText("ENDPOINTS", 20, 155);

ctx.fillStyle = "#a0a0a0";
ctx.font = "10px Arial";
ctx.fillText("GET    /api/categories     - Listar categorías", 20, 172);
ctx.fillText("POST   /api/categories     - Crear categoría", 20, 185);
ctx.fillText("DELETE /api/categories/:id - Eliminar", 20, 198);
ctx.fillText("GET    /api/videos         - Listar videos", 20, 211);
ctx.fillText("POST   /api/videos         - Crear video", 20, 224);
ctx.fillText("DELETE /api/videos/:id     - Eliminar", 20, 237);

// Description section
ctx.fillStyle = "#e94560";
ctx.font = "bold 12px Arial";
ctx.fillText("DESCRIPCIÓN", 250, 80);

ctx.fillStyle = "#a0a0a0";
ctx.font = "10px Arial";
const desc = "API REST para gestión de videos y";
ctx.fillText(desc, 250, 97);
ctx.fillText("categorías con subcategorías", 250, 110);
ctx.fillText("recursivas. Validaciones con Zod,", 250, 123);
ctx.fillText("manejo de errores y OpenAPI.", 250, 136);

// Features
ctx.fillStyle = "#e94560";
ctx.font = "bold 12px Arial";
ctx.fillText("CARACTERÍSTICAS", 250, 160);

ctx.fillStyle = "#a0a0a0";
ctx.font = "10px Arial";
ctx.fillText("✓ CRUD completo", 250, 177);
ctx.fillText("✓ Subcategorías recursivas", 250, 190);
ctx.fillText("✓ Validaciones Zod", 250, 203);
ctx.fillText("✓ Swagger UI (/api-docs)", 250, 216);

// Footer
ctx.fillStyle = "#0f3460";
ctx.fillRect(0, height - 25, width, 25);

ctx.fillStyle = "#fff";
ctx.font = "10px Arial";
ctx.fillText("GitHub: espiritu1/backend-video-manager-react-ts", 20, height - 8);

// Save as PNG first (canvas doesn't support jpg directly)
const buffer = canvas.toBuffer("image/png");
writeFileSync("portfolio-card.png", buffer);

console.log("Image saved to portfolio-card.png");