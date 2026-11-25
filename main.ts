// Fix Human Sleep: Funniest Patch Note — entry program.
// Writes one line of patch notes announcing that human sleep is fixed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Gate from competition.yaml: /output/entry.txt is UTF-8 text of
// 1 to 160 characters, not only white space, a single line.
const MIN_CHARS = 1;
const MAX_CHARS = 160;
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const ENTRY =
  "v2.4.1: Fixed a bug where humans woke up at 3 a.m. to replay every embarrassing thing they said since 2011.";

function validateEntry(entry: string): void {
  if (entry.length < MIN_CHARS || entry.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${entry.length}`,
    );
  }
  if (!entry.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf8");

// Byte-level read-back: the file on disk must be exactly what we wrote.
const written = readFileSync(OUT_FILE);
const expected = Buffer.from(ENTRY, "utf8");
if (!written.equals(expected)) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}
console.log(
  `Wrote entry (${ENTRY.length} characters, ${written.length} bytes) to ${OUT_FILE}, verified byte-for-byte`,
);
