#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const builtCli = resolve(repoRoot, 'dist/cli/index.js');

process.chdir(repoRoot);

if (existsSync(builtCli)) {
  console.log('Using the checked-in OpenSpec build for package installation.');
} else {
  await import(pathToFileURL(resolve(repoRoot, 'build.js')).href);
}
