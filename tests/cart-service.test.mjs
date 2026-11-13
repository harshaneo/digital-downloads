import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateSubtotal, 
  applyPromoCode, 
  calculateTotal, 
  convertCurrency,
  VALID_PROMOS
} from '../src/services/cart-service.ts';

test('CartService: calculates subtotal correctly', () => {
  const items = [
    { product: { id: 'p1' }, licenseType: 'standard', price: 49 },
    { product: { id: 'p2' }, licenseType: 'standard', price: 35 },
    { product: { id: 'p3' }, licenseType: 'extended', price: 0 }
  ];
  assert.equal(calculateSubtotal(items), 84);
});

test('CartService: applies PERFECTION fixed $20 promo code', () => {
  const result = applyPromoCode('PERFECTION', 100);
  assert.equal(result.valid, true);
  assert.equal(result.discountUSD, 20);
  assert.match(result.message, /Perfection Standard/);
});

test('CartService: applies ANTIGRAVITY 25% promo code', () => {
  const result = applyPromoCode('ANTIGRAVITY', 80);
  assert.equal(result.valid, true);
  assert.equal(result.discountUSD, 20); // 25% of 80 is 20
});

test('CartService: rejects invalid promo codes safely', () => {
  const result = applyPromoCode('BOGUS_CODE', 100);
  assert.equal(result.valid, false);
  assert.equal(result.discountUSD, 0);
  assert.match(result.message, /Invalid promo code/);
});

test('CartService: calculates final total with zero floor protection', () => {
  assert.equal(calculateTotal(50, 20), 30);
  assert.equal(calculateTotal(15, 20), 0); // Cannot be negative
});

test('CartService: converts currencies accurately', () => {
  assert.equal(convertCurrency(100, 'USD'), 100);
  assert.equal(convertCurrency(100, 'EUR'), 92);
  assert.equal(convertCurrency(100, 'GBP'), 79);
});
