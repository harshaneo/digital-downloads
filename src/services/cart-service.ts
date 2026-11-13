import type { CartItem, Currency } from '../types.ts';

export interface PromoResult {
  valid: boolean;
  code: string;
  discountUSD: number;
  message: string;
}

export const VALID_PROMOS: Record<string, { type: 'fixed' | 'percent'; value: number; label: string }> = {
  PERFECTION: { type: 'fixed', value: 20, label: 'Perfection Standard: $20 Off' },
  ANTIGRAVITY: { type: 'percent', value: 25, label: 'Antigravity Founder: 25% Off' },
  VAULT10: { type: 'percent', value: 10, label: 'Welcome Vault: 10% Off' }
};

export const calculateSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.price, 0);
};

export const applyPromoCode = (code: string, subtotalUSD: number): PromoResult => {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { valid: false, code: '', discountUSD: 0, message: '' };
  }

  const promo = VALID_PROMOS[normalized];
  if (!promo) {
    return {
      valid: false,
      code: normalized,
      discountUSD: 0,
      message: 'Invalid promo code. Available: PERFECTION, ANTIGRAVITY, VAULT10'
    };
  }

  let discount = 0;
  if (promo.type === 'fixed') {
    discount = Math.min(subtotalUSD, promo.value);
  } else if (promo.type === 'percent') {
    discount = Math.round((subtotalUSD * promo.value) / 100);
  }

  return {
    valid: true,
    code: normalized,
    discountUSD: discount,
    message: `${promo.label} (-$${discount})`
  };
};

export const calculateTotal = (subtotalUSD: number, discountUSD: number): number => {
  return Math.max(0, subtotalUSD - discountUSD);
};

export const convertCurrency = (amountInUSD: number, target: Currency): number => {
  const rates: Record<Currency, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79
  };
  const rate = rates[target] !== undefined ? rates[target] : 1.0;
  return amountInUSD * rate;
};
