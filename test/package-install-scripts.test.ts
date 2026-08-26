import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * The published package must ship no npm lifecycle install scripts. Any of these
 * makes `npm install` warn about unapproved install scripts, which reads as a
 * packaging problem to users. The shell-completions tip that used to live in a
 * postinstall script now prints on the CLI's first run instead.
 */
describe('published package install scripts', () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf-8')
  ) as {
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  it.each(['preinstall', 'install', 'postinstall'])(
    'declares no "%s" script',
    (lifecycle) => {
      expect(packageJson.scripts?.[lifecycle]).toBeUndefined();
    }
  );

  it('prepares Git dependencies without requiring pnpm on PATH', () => {
    expect(packageJson.scripts?.prepare).toBe('node scripts/prepare-package.mjs');
  });

  it('uses a checked-in build for Git source installations', () => {
    const preparePath = path.join(repoRoot, 'scripts', 'prepare-package.mjs');
    expect(fs.existsSync(preparePath)).toBe(true);
    if (!fs.existsSync(preparePath)) return;

    const prepareScript = fs.readFileSync(preparePath, 'utf-8');
    expect(prepareScript).toContain('dist/cli/index.js');
    expect(prepareScript).not.toContain('--ignore-scripts');
    expect(fs.existsSync(path.join(repoRoot, 'dist', 'cli', 'index.js'))).toBe(true);
  });

  it('keeps compiler dependencies build-only', () => {
    expect(packageJson.devDependencies?.typescript).toBeDefined();
    expect(packageJson.devDependencies?.['@types/node']).toBeDefined();
    expect(packageJson.dependencies?.typescript).toBeUndefined();
    expect(packageJson.dependencies?.['@types/node']).toBeUndefined();
  });
});
