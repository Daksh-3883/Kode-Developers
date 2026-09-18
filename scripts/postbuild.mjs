import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const index = await readFile(path.join(dist, "index.html"), "utf8");

const copyIfExists = async (from, to) => {
  const source = path.join(root, from);
  if (existsSync(source)) {
    await mkdir(path.dirname(path.join(dist, to)), { recursive: true });
    await cp(source, path.join(dist, to), { recursive: true });
  }
};

await copyIfExists("docs", "docs");
await copyIfExists("docs/Robots/robots.txt", "robots.txt");
await copyIfExists("docs/Sitemap/sitemap.xml", "sitemap.xml");

await writeFile(path.join(dist, "404.html"), index);

const compatibilityFiles = [
  "products.html",
  "projects.html",
  "ai.html",
  "chatkode.html",
  "about.html",
  "updates.html",
  "contact.html",
  "webprojects.html",
  "pipeline.html",
  "root/products.html",
  "root/projects.html",
  "root/ai.html",
  "root/chatkode.html",
  "root/about.html",
  "root/updates.html",
  "root/contact.html",
  "root/webprojects.html",
  "root/pipeline.html",
  "root/404.html",
];

await Promise.all(
  compatibilityFiles.map(async file => {
    const target = path.join(dist, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, index);
  }),
);
