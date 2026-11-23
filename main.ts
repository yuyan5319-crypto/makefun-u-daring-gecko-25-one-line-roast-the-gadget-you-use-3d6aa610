import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roast =
  "My wireless earbuds last four hours on the couch and four minutes outside — fresh air must be their natural predator.";

const line = roast.trim();
if (line.length === 0) throw new Error("roast line is empty");
if (line.length > 200) throw new Error(`roast line is ${line.length} chars, over the 200-char limit`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output/entry.txt";
const dir = outDir.endsWith("entry.txt") ? outDir.slice(0, -"entry.txt".length) || "." : outDir;
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), line + "\n", "utf8");
console.log(line);
