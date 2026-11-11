import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { findPublishedSecrets, scanDirectory } from "./published-secrets.mjs";

test("an email address in a published file is a secret", () => {
  const email = ["ada", "example.com"].join("@");
  const findings = findPublishedSecrets([{ path: "signatories.json", text: email }]);
  assert.deepEqual(findings, [{ path: "signatories.json", line: 1, rule: "email" }]);
});

test("a private key in a published file is a secret", () => {
  const marker = "-----BEGIN " + "RSA PRIVATE KEY-----";
  const findings = findPublishedSecrets([{ path: "index.html", text: marker }]);
  assert.deepEqual(findings, [{ path: "index.html", line: 1, rule: "private-key" }]);
});

test("a known API token in a published file is a secret", () => {
  const prefixes = ["ghp_", "github_pat_", "sk_live_", "sk_test_", "xoxb-", "AKIA"];
  const secret = "A".repeat(20);
  for (const prefix of prefixes) {
    const findings = findPublishedSecrets([{ path: "layout.html", text: prefix + secret }]);
    assert.deepEqual(findings, [{ path: "layout.html", line: 1, rule: "token" }]);
  }
});

test("an email field in signatory data is a secret", () => {
  const keys = ["e" + "mail", "e-" + "mail", "e" + "mailAddress"];
  for (const key of keys) {
    const text = `[\n  { "${key}": "not-shown", "name": "Ada" }\n]`;
    const findings = findPublishedSecrets([{ path: "signatories.json", text }]);
    assert.deepEqual(findings, [{ path: "signatories.json", line: 2, rule: "email-field" }]);
  }
});

test("an unquoted email field in signatory data is a secret", () => {
  const key = "e" + "mail";
  const text = `const approved = [{ ${key}: "not-shown", name: "Ada" }];`;
  const findings = findPublishedSecrets([{ path: "sign.html", text }]);
  assert.deepEqual(findings, [{ path: "sign.html", line: 1, rule: "email-field" }]);
});

test("css at-rules and the public form link are not secrets", () => {
  const text = "@media (max-width: 750px) { .a { color: red; } }\nhttps://form.jotform.com/262833420847056\n";
  assert.deepEqual(findPublishedSecrets([{ path: "index.html", text }]), []);
});

test("a directory scan reports a published email and skips .git", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "published-secrets-"));
  try {
    fs.mkdirSync(path.join(root, ".git"));
    fs.writeFileSync(path.join(root, ".git", "config"), ["secret", "example.com"].join("@"));
    fs.writeFileSync(path.join(root, "page.html"), ["ada", "example.com"].join("@") + "\n@media (max-width: 10px) {}\n");
    const findings = scanDirectory(root);
    assert.deepEqual(findings, [{ path: "page.html", line: 1, rule: "email" }]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
