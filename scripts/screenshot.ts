import puppeteer from "puppeteer";
import { spawn } from "child_process";

const server = spawn("bun", ["run", "src/server.ts"], {
  stdio: "pipe",
  shell: true,
});

server.stdout.on("data", (data) => console.log(data.toString()));
server.stderr.on("data", (data) => console.error(data.toString()));

setTimeout(async () => {
  console.log("Taking screenshot...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto("http://localhost:3000/api-docs", { waitUntil: "networkidle0" });

  await page.screenshot({ path: "swagger-screenshot.png", fullPage: true });

  console.log("Screenshot saved to swagger-screenshot.png");

  await browser.close();
  server.kill();
  process.exit(0);
}, 5000);