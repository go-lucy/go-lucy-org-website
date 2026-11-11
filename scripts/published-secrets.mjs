import fs from "node:fs";
import path from "node:path";

const SKIP_DIRS = new Set([".git", "node_modules"]);

const RULES = [
  ["email", /[a-zA-Z0-9._%+-]+@[a-zA-Z][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}/],
  ["private-key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["token", /(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk_(?:live|test)_[A-Za-z0-9]{10,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16})/],
  ["email-field", /["']e-?mail(?:Address)?["']\s*:|\be-?mail(?:Address)?\s*:/i],
];

export function findPublishedSecrets(files) {
  const findings = [];
  for (const file of files) {
    const lines = file.text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index++) {
      for (const [rule, pattern] of RULES) {
        if (pattern.test(lines[index])) {
          findings.push({ path: file.path, line: index + 1, rule });
        }
      }
    }
  }
  return findings;
}

export function scanDirectory(root) {
  return findPublishedSecrets(collect(root));
}

function collect(root) {
  const files = [];
  walk(root, root, files);
  return files;
}

function walk(dir, root, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), root, files);
      continue;
    }
    if (!entry.isFile()) continue;
    const full = path.join(dir, entry.name);
    const buffer = fs.readFileSync(full);
    if (buffer.includes(0)) continue;
    files.push({
      path: path.relative(root, full).split(path.sep).join("/"),
      text: buffer.toString("utf8"),
    });
  }
}
