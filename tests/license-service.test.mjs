import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  generateLicenseKey, 
  generateInvoiceId, 
  createLicenseManifest 
} from '../src/services/license-service.ts';

test('LicenseService: generates properly formatted license keys', () => {
  const key = generateLicenseKey('NX');
  assert.match(key, /^NX-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
});

test('LicenseService: generates unique keys on consecutive calls', () => {
  const key1 = generateLicenseKey();
  const key2 = generateLicenseKey();
  assert.notEqual(key1, key2);
});

test('LicenseService: generates formatted invoice IDs', () => {
  const invoice = generateInvoiceId();
  assert.match(invoice, /^INV-\d{4}-\d{5}$/);
});

test('LicenseService: generates complete cryptographically signed manifest', () => {
  const item = {
    id: 'test-item',
    invoiceNumber: 'INV-2026-99999',
    purchaseDate: '2026-11-05',
    licenseKey: 'NX-TEST-KEY1-2026',
    downloadUrl: 'https://test.cdn/asset.zip',
    product: {
      id: 'prod-1',
      title: 'Test Asset',
      version: '1.0.0',
      fileFormat: '.ZIP',
      fileSize: '50 MB',
      license: 'Commercial & Personal',
      creator: { name: 'Test Creator' },
      includedFiles: [{ name: 'file.txt', size: '10 KB', type: 'text' }]
    }
  };

  const manifest = createLicenseManifest(item);
  assert.equal(manifest.invoice, 'INV-2026-99999');
  assert.equal(manifest.licenseKey, 'NX-TEST-KEY1-2026');
  assert.equal(manifest.digitalAsset.name, 'Test Asset');
  assert.match(manifest.checksum, /^sha256-/);
});
