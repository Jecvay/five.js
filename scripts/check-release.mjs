import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

function checkRelease() {
  if (manifest.private) {
    throw new Error('The package is private. Enable publishing when the public API is ready.');
  }

  const match = /^0\.([1-9][0-9]*)\.0$/.exec(manifest.version);
  if (!match) {
    throw new Error('Stable releases must use version 0.N.0 with a positive revision number.');
  }

  const tag = `r${match[1]}`;
  const headTags = execFileSync('git', ['tag', '--points-at', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
  }).trim().split('\n');

  if (!headTags.includes(tag)) {
    throw new Error(`Version ${manifest.version} requires tag ${tag} on HEAD.`);
  }

  const trackedChanges = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (trackedChanges) {
    throw new Error('Commit tracked changes before publishing from the release tag.');
  }

  console.log(`${tag} matches ${manifest.name}@${manifest.version}.`);
}

try {
  checkRelease();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
