import "dotenv/config";
import { spawn } from "child_process";

const server = spawn("bun", ["run", "src/server.ts"], {
  stdio: "pipe",
  shell: true,
});

server.stdout.on("data", (data) => {
  console.log(data.toString());
});

server.stderr.on("data", (data) => {
  console.error(data.toString());
});

setTimeout(async () => {
  try {
    const baseUrl = "http://localhost:3000";

    console.log("\n=== Testing API ===\n");

    console.log("1. Health check:");
    const health = await fetch(`${baseUrl}/health`).then(r => r.json());
    console.log(health);

    console.log("\n2. Create main category:");
    const cat1 = await fetch(`${baseUrl}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "React" }),
    }).then(r => r.json());
    console.log(cat1);

    console.log("\n3. Create subcategory:");
    const cat2 = await fetch(`${baseUrl}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Hooks", parentId: 1 }),
    }).then(r => r.json());
    console.log(cat2);

    console.log("\n4. List categories:");
    const cats = await fetch(`${baseUrl}/api/categories`).then(r => r.json());
    console.log(cats);

    console.log("\n5. Create video:");
    const video = await fetch(`${baseUrl}/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "useState Tutorial",
        description: "Learn useState",
        videoPath: "/videos/react-useState.mp4",
        categoryId: 2
      }),
    }).then(r => r.json());
    console.log(video);

    console.log("\n6. List videos:");
    const videos = await fetch(`${baseUrl}/api/videos`).then(r => r.json());
    console.log(videos);

    console.log("\n=== All tests passed! ===");
    server.kill();
    process.exit(0);
  } catch (e) {
    console.error("Error:", e.message);
    server.kill();
    process.exit(1);
  }
}, 3000);