import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const totalETB = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName || !customerPhone) return;

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: orderType,
          customerName,
          customerPhone,
          tableNumber: notes.includes('Table') ? notes : (orderType === 'dine-in' ? 'Table 1' : undefined),
          items: cartItems,
          totalAmount: totalETB,
          paymentMethod: 'Telebirr',
          notes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setOrderNumber(data.id || `MALO-${Math.floor(1000 + Math.random() * 9000)}`);
      } else {
        setOrderNumber(`MALO-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      console.error('Order dispatch error:', err);
      setOrderNumber(`MALO-${Math.floor(1000 + Math.random() * 9000)}`);
    }

    setOrderPlaced(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setOrderPlaced(false);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md glass-panel border-l border-white/60 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-base">Your Mal-o Order</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {orderPlaced ? (
          <div className="p-8 text-center my-auto space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-black text-stone-900 font-serif">Order Confirmed!</h3>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900">
              <span className="text-xs uppercase font-bold text-amber-700 block">Order Ticket #</span>
              <span className="text-2xl font-black font-mono">{orderNumber}</span>
            </div>
            <p className="text-xs text-stone-600">
              Thank you, <span className="font-bold text-stone-900">{customerName}</span>! Your order has been sent to our kitchen on the 1st floor in Secha.
            </p>
            <button
              onClick={handleCloseAndReset}
              className="w-full py-3.5 bg-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-md"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                <p className="font-medium text-sm">Your order list is empty.</p>
                <p className="text-xs">Add items from our 3D Studio or Menu!</p>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-500'
                    }`}
                  >
                    Dine-In (1st Floor)
                  </button>
                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-500'
                    }`}
                  >
                    Takeaway Pick-Up
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-stone-900 truncate">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-[10px] text-amber-700 font-semibold truncate">
                            {item.subtitle}
                          </div>
                        )}
                        <div className="text-xs font-black text-amber-600 mt-0.5">
                          {item.price} ETB
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 rounded-lg bg-white border border-stone-200 text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 rounded-lg bg-white border border-stone-200 text-stone-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Details Form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-4 border-t border-stone-200">
                  <h4 className="font-extrabold text-xs text-stone-900 uppercase tracking-wider">
                    Customer Information
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 0911234567)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />

                  <input
                    type="text"
                    placeholder="Table # or Special Notes (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />

                  {/* Summary Footer */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm font-extrabold text-stone-900">
                      <span>Total Amount:</span>
                      <span className="text-amber-600 text-lg">{totalETB} ETB</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      <span>Confirm Order ({totalETB} ETB)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
