import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { applyPromoCode } from '../services/cart-service';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: (appliedDiscountUSD: number) => void;
  formatPrice: (amountInUSD: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onCheckout,
  formatPrice
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const result = applyPromoCode(couponCode, subtotal);
    if (result.valid) {
      setAppliedDiscount(result.discountUSD);
      setDiscountMsg({ type: 'success', text: result.message });
    } else {
      setAppliedDiscount(0);
      setDiscountMsg({ type: 'error', text: result.message });
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/30 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col z-10 text-stone-800">
          
          {/* Mobile Sheet Grab Indicator */}
          <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#e06344]" />
              <h2 className="font-extrabold text-base text-stone-900">Your Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700 font-mono text-xs font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-stone-900">Your cart is empty</h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Explore UI kits, 3D models, fonts, or code starters to add assets.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 keycap-soft-dark text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex items-start gap-3 group hover:border-stone-300 transition-colors shadow-2xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-200 border border-stone-300/80 flex items-center justify-center font-mono font-bold text-xs text-stone-700 shrink-0">
                    {item.product.fileFormat}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <span className="capitalize">{item.licenseType} License</span>
                      <span>•</span>
                      <span>{item.product.fileSize}</span>
                    </div>
                    <div className="text-xs font-extrabold text-[#e06344] mt-1 font-mono">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Box */}
          {cart.length > 0 && (
            <div className="p-5 bg-stone-50/90 border-t border-stone-200 space-y-4">
              
              {/* Promo Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. PERFECTION)"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 uppercase font-mono focus:outline-none focus:border-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 keycap-soft-light text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {discountMsg && (
                  <p className={`text-[11px] flex items-center gap-1 ${
                    discountMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {discountMsg.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    <span>{discountMsg.text}</span>
                  </p>
                )}
              </form>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-bold">{formatPrice(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Instant Delivery</span>
                  <span className="text-emerald-700 font-bold">FREE DOWNLOAD</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span className="font-sans font-bold">Total</span>
                  <span className="text-[#e06344] font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                type="button"
                onClick={() => onCheckout(appliedDiscount)}
                className="w-full py-3 px-4 rounded-xl keycap-soft-terracotta text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Instant Checkout & Download</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant cryptographically signed digital download token</span>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
