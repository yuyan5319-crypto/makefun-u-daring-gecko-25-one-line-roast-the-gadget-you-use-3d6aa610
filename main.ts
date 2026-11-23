// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and prints it to stdout.
// Note: $MAKEFUN_OUTPUT_DIR names the output DIRECTORY, not the file;
// the entry file is always entry.txt inside that directory.
// The line must be non-empty, a single line, and at most 200 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The roast: my laptop fan treats Excel like a AAA game.
const ROAST =
  "My laptop fan stays silent through whole movies, then screams like a jet engine the second I open a spreadsheet — Excel is apparently the most demanding game I own.";

const MAX_CHARS = 200;

// Normalise the line: no leading/trailing whitespace, one line only.
const line = ROAST.trim();

// Fail loudly if the entry would be invalid.
if (line.length === 0) {
  throw new Error("roast line is empty");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("roast line must be a single line");
}
if (/[\u0000-\u001f]/.test(line)) {
  throw new Error("roast line contains control characters");
}
if (line.length > MAX_CHARS) {
  throw new Error(
    `roast line is ${line.length} characters, over the ${MAX_CHARS}-character limit`,
  );
}

// Resolve the output file: $MAKEFUN_OUTPUT_DIR is a DIRECTORY
// (the grader sets it to /output); the entry file is entry.txt
// inside it. Only treat the value as a file path when it already
// ends with "entry.txt"; otherwise join "entry.txt" inside the dir.
// When unset, default to /output/entry.txt.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = outputDir.endsWith("entry.txt")
  ? outputDir
  : join(outputDir, "entry.txt");

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(join(outputFile), line + "\n", "utf8");

console.log(line);
console.log(`(${line.length} characters, 1 line)`);
