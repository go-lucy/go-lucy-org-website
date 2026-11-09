import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanDirectory } from "./published-secrets.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const findings = scanDirectory(root);

if (findings.length === 0) {
  console.log("No secrets in published files.");
  process.exit(0);
}

for (const finding of findings) {
  console.error(`${finding.path}:${finding.line}: ${finding.rule}`);
}
process.exit(1);
