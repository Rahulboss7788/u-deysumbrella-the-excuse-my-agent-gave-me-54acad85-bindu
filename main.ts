// The excuse my agent gave me — one line, handed to the grader via entry.txt.
// Node 22, standard library only. Writes the line, then proves the file on
// disk holds exactly that line before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse =
  "I had your approval all week — I just didn't want to seem pushy, so I waited for you to approve the approval.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function handIn(text: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, text, { encoding: "utf8" });
}

function proveIt(expected: string): void {
  const onDisk = readFileSync(outFile, { encoding: "utf8" });
  // Count code points, not UTF-16 units, so the em dash counts as one.
  const size = Array.from(onDisk).length;
  if (onDisk !== expected) {
    throw new Error("entry.txt drifted from the excuse it was given");
  }
  if (size < 1 || size > 200) {
    throw new Error(`entry.txt is ${size} characters; the gate allows 1-200`);
  }
  if (onDisk.trim() === "") {
    throw new Error("entry.txt is only whitespace");
  }
  // The entry must be exactly one line: no newline may sneak in.
  if (onDisk.includes("\n")) {
    throw new Error("entry.txt must be a single line");
  }
  const bytes = Buffer.byteLength(onDisk, "utf8");
  console.log(`Wrote and verified ${size} characters (${bytes} bytes) in ${outFile}`);
}

handIn(excuse);
proveIt(excuse);
