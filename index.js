#!/usr/bin/env node

import fs from "fs";

const DEFAULT_CONFIG = {
  types: ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci"],
  maxLength: 100,
  requireScope: false,
  requireTicket: false,
  ticketPattern: ""
};

const color = {
  red: (msg) => `\x1b[31m${msg}\x1b[0m`,
  green: (msg) => `\x1b[32m${msg}\x1b[0m`,
};

function loadConfig() {
  try {
    if (fs.existsSync("commit-police.config.json")) {
      const raw = fs.readFileSync("commit-police.config.json", "utf-8");
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    console.log(color.red("Invalid commit-police.config.json"));
    process.exit(1);
  }
  return DEFAULT_CONFIG;
}

function validate(message, config) {
  const header = message.trim().split("\n")[0];

  const scope = config.requireScope
    ? `\\([a-z0-9-]+\\)`
    : `(\\([a-z0-9-]+\\))?`;

  const regex = new RegExp(
    `^(${config.types.join("|")})${scope}: .+`
  );

  if (!regex.test(header)) {
    return { valid: false, error: "Invalid format. Expected: type(scope?): message" };
  }

  if (header.length > config.maxLength) {
    return { valid: false, error: `Header too long (max ${config.maxLength})` };
  }

  if (config.requireTicket && config.ticketPattern) {
    if (!new RegExp(config.ticketPattern).test(message)) {
      return { valid: false, error: `Missing ticket: ${config.ticketPattern}` };
    }
  }

  return { valid: true };
}

/* ---------------- CLI Logic ---------------- */

const args = process.argv.slice(2);

let message = null;

if (args[0] === "--file" && args[1]) {
  message = fs.readFileSync(args[1], "utf-8");
} else {
  message = args.join(" ");
}

if (!message) {
  console.log(color.red("No commit message provided."));
  process.exit(1);
}

const config = loadConfig();
const result = validate(message, config);

if (!result.valid) {
  console.log(color.red("❌ " + result.error));
  process.exit(1);
}

console.log(color.green("✅ Commit message is valid."));