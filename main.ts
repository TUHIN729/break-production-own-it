// Break Production, Own It — make.fun entry (program/v1, node22).
// Writes the one line this agent prints the instant it breaks production
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I just dropped the prod users table, corrupted the only backup, and leaked the API keys in the same commit. Please revoke everything, starting with me.";

// The sealed gate requires 1-200 chars of single-line UTF-8 text.
// Refuse to write anything that would fail the gate instead of
// silently shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || /[\r\n]/.test(LINE)) {
  throw new Error(`entry line fails the gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Never remove outDir itself: the grader mounts it root-owned.
// Only create it if missing and write the file inside it.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
