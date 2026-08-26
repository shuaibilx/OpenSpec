#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const require = createRequire(import.meta.url);

process.chdir(repoRoot);

function hasTypeScriptCompiler() {
  try {
    require.resolve('typescript/bin/tsc', { paths: [repoRoot] });
    return true;
  } catch {
    return false;
  }
}

if (!hasTypeScriptCompiler()) {
  const npmExecPath = process.env.npm_execpath;
  if (!npmExecPath) {
    throw new Error(
      'OpenSpec source installation needs npm_execpath to bootstrap build dependencies.'
    );
  }

  console.log('Installing build dependencies for a Git source installation...');

  // `npm install --global <git-url>` can run prepare in a clean clone without
  // exposing that clone's devDependencies. Install them locally and suppress
  // lifecycle scripts so this prepare hook cannot recurse into itself.
  execFileSync(
    process.execPath,
    [
      npmExecPath,
      'install',
      '--ignore-scripts',
      '--global=false',
      '--include=dev',
      '--no-save',
      '--no-package-lock',
      '--no-audit',
      '--no-fund',
      '--prefix',
      repoRoot,
    ],
    {
      cwd: repoRoot,
      env: { ...process.env, npm_config_global: 'false' },
      stdio: 'inherit',
    }
  );

  if (!hasTypeScriptCompiler()) {
    throw new Error('TypeScript was not available after bootstrapping build dependencies.');
  }
}

await import(pathToFileURL(resolve(repoRoot, 'build.js')).href);
