import "dotenv/config";
import { spawnSync } from "child_process";

const result = spawnSync("bunx", ["prisma", "db", "push", "--schema=prisma/schema.prisma"], {
  stdio: "inherit",
  shell: true,
  cwd: process.cwd(),
  env: { ...process.env },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("Database synchronized!");