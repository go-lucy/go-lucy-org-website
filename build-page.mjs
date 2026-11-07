import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".");
const sectionsDir = path.join(root, "sections");
const marker = "<!-- SECTIONS -->";
const files = fs.readdirSync(sectionsDir).filter((name) => name.endsWith(".html")).sort();
const sections = files.map((name) => fs.readFileSync(path.join(sectionsDir, name), "utf8").trim()).join("\n");
const layout = fs.readFileSync(path.join(root, "layout.html"), "utf8");
if (!layout.includes(marker)) {
  console.error("layout.html is missing <!-- SECTIONS -->");
  process.exit(1);
}
fs.writeFileSync(path.join(root, "index.html"), layout.replace(marker, sections));
console.log(`Wrote index.html from ${files.length} section files`);
