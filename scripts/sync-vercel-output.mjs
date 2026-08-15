import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const source = path.join(repoRoot, "presci-scan", ".vercel", "output");
const target = path.join(repoRoot, ".vercel", "output");

async function ensureSourceExists() {
  try {
    const s = await stat(source);
    if (!s.isDirectory()) {
      throw new Error("Source exists but is not a directory");
    }
  } catch {
    throw new Error(
      `Expected build output at ${source}. Run build in presci-scan first.`,
    );
  }
}

async function sync() {
  await ensureSourceExists();
  await mkdir(path.dirname(target), { recursive: true });
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true, force: true });
  console.log(`Synced Vercel output: ${source} -> ${target}`);
}

sync().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
