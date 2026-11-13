import type { DigitalProduct, PurchasedItem } from '../types.ts';

export const generateLicenseKey = (prefix = 'NX'): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Base32 unambiguous
  const chunk = (len: number) => 
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  
  return `${prefix}-${chunk(4)}-${chunk(4)}-${chunk(4)}`;
};

export const generateInvoiceId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `INV-${year}-${randomNum}`;
};

export const createLicenseManifest = (item: PurchasedItem) => {
  return {
    distributionNetwork: 'NEXUS VAULT SECURE DISTRIBUTION',
    protocolVersion: '2.4.0',
    invoice: item.invoiceNumber,
    issuedAt: item.purchaseDate,
    licenseKey: item.licenseKey,
    digitalAsset: {
      id: item.product.id,
      name: item.product.title,
      version: item.product.version,
      fileFormat: item.product.fileFormat,
      archiveSize: item.product.fileSize,
      licenseTerms: item.product.license,
      creator: item.product.creator.name,
    },
    includedFiles: item.product.includedFiles,
    checksum: `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    downloadMirror: `https://cdn.nexus-vault.network/v1/download/${item.product.id}?key=${item.licenseKey}`
  };
};

export const triggerBlobDownload = (fileName: string, data: object): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Security & performance cleanup
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
