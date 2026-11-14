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
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111317] border-l border-white/10 shadow-2xl flex flex-col z-10 text-[#f4f5f6]">
          
          {/* Mobile Sheet Grab Indicator */}
          <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto my-2 sm:hidden shrink-0" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0e1014]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-extrabold text-base text-white">Your Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#16181d] text-zinc-300 border border-white/10 font-mono text-xs font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#16181d] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-white">Your cart is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Explore contracts, RFP kits, SOPs, or financial models to add to your cart.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 btn-primary text-zinc-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className="p-3.5 rounded-2xl bg-[#16181d] border border-white/[0.08] flex items-start gap-3 group hover:border-white/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0e1014] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-zinc-300 shrink-0">
                    {item.product.fileFormat}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                      <span className="capitalize">{item.licenseType} License</span>
                      <span>•</span>
                      <span>{item.product.fileSize}</span>
                    </div>
                    <div className="text-xs font-extrabold text-amber-400 mt-1 font-mono">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
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
            <div className="p-5 bg-[#0e1014] border-t border-white/[0.08] space-y-4">
              
              {/* Promo Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. PERFECTION)"
                      className="w-full pl-8 pr-3 py-1.5 bg-[#16181d] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 uppercase font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 btn-secondary text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {discountMsg && (
                  <p className={`text-[11px] flex items-center gap-1 ${
                    discountMsg.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {discountMsg.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    <span>{discountMsg.text}</span>
                  </p>
                )}
              </form>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-white/[0.08] font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Immediate Access</span>
                  <span className="text-emerald-400 font-bold">FREE DOWNLOAD</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/[0.08]">
                  <span className="font-sans font-bold">Total</span>
                  <span className="text-amber-400 font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                type="button"
                onClick={() => onCheckout(appliedDiscount)}
                className="w-full py-3 px-4 rounded-xl btn-primary text-zinc-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Instant Checkout & Download</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Immediate perpetual license and file access</span>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
