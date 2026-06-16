import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

const expectedArtifacts = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/index.d.ts',
  'dist/index.d.cts',
];

test('dist artifacts exist', () => {
  for (const artifact of expectedArtifacts) {
    assert.equal(existsSync(artifact), true, `${artifact} should exist`);
  }
});

test('public ESM API', async () => {
  const mod = await import('../dist/index.js');

  assert.equal(typeof mod.createThing, 'function');
  assert.equal(typeof mod.Thing, 'function');
  assert.equal(mod.createThing({ enabled: true }).isEnabled(), true);
});

test('public CJS API', async () => {
  const mod = await import('../dist/index.cjs');

  assert.equal(typeof mod.createThing, 'function');
});
