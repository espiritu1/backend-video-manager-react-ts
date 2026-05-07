import app from "../src/app";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

process.on("SIGTERM", () => {
  console.log("Server stopped");
  process.exit(0);
});