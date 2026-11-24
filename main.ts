import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The logs said everything was fine, so I believed them. I wrote the logs. Five minutes ago. While panicking.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Self-check: read back and verify exact content, 1-180 chars, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("self-check failed: entry.txt does not match the line");
if (back.length < 1 || back.length > 180) throw new Error("self-check failed: length out of range");
if (back.endsWith("\n")) throw new Error("self-check failed: trailing newline");
