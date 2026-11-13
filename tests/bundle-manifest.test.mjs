import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  getBundleManifest, 
  BUNDLE_MANIFESTS, 
  STANDARD_LICENSE_TIERS 
} from '../src/data/bundle-manifests.ts';

test('BundleManifest: retrieves known flagship manifests with verified SHA-256', () => {
  const apex = getBundleManifest('apex-design-system');
  assert.equal(apex.bundleId, 'apex-design-system');
  assert.equal(apex.version, '3.2.0');
  assert.equal(apex.sha256.length, 64);
  assert.match(apex.sha256, /^[a-f0-9]{64}$/);
  assert.ok(apex.fileTree.length > 0);
  assert.ok(apex.changelog.length >= 2);
  assert.deepEqual(apex.creatorTips.suggestedAmounts, [0, 5, 15, 25]);
});

test('BundleManifest: generates consistent fallback manifest for any product ID', () => {
  const custom = getBundleManifest('custom-ui-pack', 'Custom UI Pack', 'Alex Rivera', '.ZIP', '64 MB');
  assert.equal(custom.bundleId, 'custom-ui-pack');
  assert.equal(custom.version, '1.0.0');
  assert.equal(custom.sha256.length, 64);
  assert.ok(custom.fileTree.length > 0);
  assert.equal(custom.creatorTips.creatorName, 'Alex Rivera');
  assert.ok(custom.creatorTips.creatorHandle.includes('alex_rivera'));
});

test('BundleManifest: verifies file tree supports folders, files, and sample specimen flags', () => {
  const hyperion = getBundleManifest('hyperion-3d-cyberpunk');
  assert.ok(hyperion.fileTree.some(item => item.type === 'folder' && item.children && item.children.length > 0));
  assert.ok(hyperion.fileTree.some(item => item.sampleAvailable === true));
});

test('LicenseMatrix: provides full Personal, Commercial, and Enterprise contracts', () => {
  assert.equal(STANDARD_LICENSE_TIERS.length, 3);
  
  const [personal, commercial, enterprise] = STANDARD_LICENSE_TIERS;
  assert.equal(personal.id, 'personal');
  assert.equal(personal.priceMultiplier, 1.0);
  assert.ok(personal.allowedUses.length > 0);
  assert.ok(personal.prohibitedUses.length > 0);

  assert.equal(commercial.id, 'commercial');
  assert.ok(commercial.priceMultiplier > personal.priceMultiplier);

  assert.equal(enterprise.id, 'enterprise');
  assert.ok(enterprise.priceMultiplier > commercial.priceMultiplier);
});
