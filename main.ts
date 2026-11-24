import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE = "ERROR: Your fitness app called. It said no. I agreed.";

// Guards: exactly one line, at most 120 characters, no leading or trailing
// whitespace, no invisible characters, printable ASCII only (the gate counts
// characters, so a non-ASCII code point would make JS .length lie).
if (LINE.length > 120) throw new Error(`line too long: ${LINE.length}`);
if (LINE !== LINE.trim()) throw new Error("line has leading or trailing whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("line must be a single line");
if (/[\u00a0\u200b\u200c\u200d\ufeff]/.test(LINE)) throw new Error("line contains an invisible character");
if (/[^\x20-\x7e]/.test(LINE)) throw new Error("line must be printable ASCII");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
chmodSync("/output/entry.txt", 0o644);

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
