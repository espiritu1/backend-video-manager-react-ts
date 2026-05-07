import "dotenv/config";
import { fetch } from "bun";

const baseUrl = "http://localhost:3000";

async function testApi() {
  console.log("Testing API...\n");

  console.log("1. Health check:");
  const health = await fetch(`${baseUrl}/health`).then(r => r.json());
  console.log(health);

  console.log("\n2. Create category:");
  const createCat = await fetch(`${baseUrl}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Movies" }),
  }).then(r => r.json());
  console.log(createCat);

  console.log("\n3. List categories:");
  const listCats = await fetch(`${baseUrl}/api/categories`).then(r => r.json());
  console.log(listCats);
}

testApi().catch(console.error);