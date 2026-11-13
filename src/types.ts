export type ProductCategory = 
  | 'all'
  | 'websites-ui'
  | 'backends'
  | 'react-apps'
  | 'mobile-apps'
  | 'documents-pdf'
  | 'spreadsheets'
  | 'resumes';

export interface IncludedFile {
  name: string;
  size: string;
  type: string;
}

export interface Creator {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  salesCount: number;
}

export interface DigitalProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  price: number; // in USD
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  downloadsCount: number;
  fileFormat: string;
  fileSize: string;
  version: string;
  updatedAt: string;
  license: 'Commercial & Personal' | 'Extended Commercial' | 'Open Source MIT';
  previewGradient: string;
  iconName: string;
  tags: string[];
  creator: Creator;
  features: string[];
  includedFiles: IncludedFile[];
  badge?: 'HOT' | 'NEW' | 'FEATURED' | 'FREE' | 'BESTSELLER';
  isTrending?: boolean;
}

export type LicenseTierId = 'personal' | 'commercial' | 'enterprise';

export interface LicenseTier {
  id: LicenseTierId;
  name: string;
  priceMultiplier: number;
  allowedUses: string[];
  prohibitedUses: string[];
  badge?: string;
  description?: string;
}

export interface FileTreeItem {
  name: string;
  size?: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileTreeItem[];
  sampleAvailable?: boolean;
  sampleDownloadUrl?: string;
}

export interface BundleReleaseVersion {
  version: string;
  releaseDate: string;
  title: string;
  changes: string[];
  breaking?: boolean;
}

export interface TipConfig {
  suggestedAmounts: number[];
  creatorHandle: string;
  creatorName: string;
  messagePrompt?: string;
}

export interface BundleManifest {
  bundleId: string;
  version: string;
  releaseDate: string;
  totalFiles: number;
  totalSize: string;
  sha256: string;
  signature: string;
  fileTree: FileTreeItem[];
  changelog: BundleReleaseVersion[];
  creatorTips: TipConfig;
}

export interface CartItem {
  product: DigitalProduct;
  licenseType: 'standard' | 'extended' | LicenseTierId;
  price: number;
  tipAmount?: number;
}

export interface PurchasedItem {
  id: string;
  product: DigitalProduct;
  purchaseDate: string;
  licenseKey: string;
  invoiceNumber: string;
  downloadUrl: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface FilterState {
  category: ProductCategory;
  search: string;
  priceFilter: 'all' | 'free' | 'under-25' | '25-50' | '50-plus';
  sortBy: 'popular' | 'rating' | 'price-asc' | 'price-desc' | 'newest';
  format: string;
  commercialOnly: boolean;
}

export type ViewMode = 'grid' | 'bento' | 'compact';
