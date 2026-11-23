import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roast =
  "My laptop fan stays silent through whole movies, then screams like a jet engine the second I open a spreadsheet — Excel is apparently the most demanding game I own.";

const line = roast.trim();
if (line.length === 0) throw new Error("roast line is empty");
if (line.length > 200) throw new Error(`roast line is ${line.length} chars, over the 200-char limit`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output/entry.txt";
const dir = outDir.endsWith("entry.txt") ? outDir.slice(0, -"entry.txt".length) || "." : outDir;
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), line + "\n", "utf8");
console.log(line);
