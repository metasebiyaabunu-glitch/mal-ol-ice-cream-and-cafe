import React, { useState } from 'react';
import { ShoppingBag, Star, Phone, Sparkles, Menu as MenuIcon, X, MapPin, Gamepad2, ShieldAlert } from 'lucide-react';
import { SHOP_INFO } from '../data/maloData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: '3d-studio', label: '3D Studio', icon: Sparkles, badge: 'Interactive' },
    { id: 'menu', label: 'Menu & Snacks', icon: undefined },
    { id: 'board-games', label: 'Board Games', icon: Gamepad2 },
    { id: 'ai-crafter', label: 'AI Flavor Crafter', icon: Sparkles },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'location', label: 'Location & Hours', icon: MapPin },
    { id: 'admin', label: 'Manager Portal', icon: ShieldAlert, badge: 'Staff' }
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600/90 via-orange-500/90 to-amber-600/90 backdrop-blur-md text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-white/25 border border-white/30 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold">1st Floor Secha</span>
        <span>Arba Minch's Premier Homemade Gelato & Board Game Cafe • Call: 092 228 1940</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            ማ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-stone-900 tracking-tight font-serif">
                ማልኦ
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Mal-o
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <div className="flex items-center text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500 mr-0.5" />
                <span>{SHOP_INFO.rating}</span>
              </div>
              <span>•</span>
              <span>16 Google Reviews</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'text-stone-700 hover:text-amber-600 hover:bg-amber-50/80'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Phone Call Quick Link */}
          <a
            href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-amber-100 hover:text-amber-800 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>092 228 1940</span>
          </a>

          {/* Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Order</span>
            {cartCount > 0 && (
              <span className="bg-white text-amber-700 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-amber-500 text-white font-bold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <a
            href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
            className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-stone-100 text-stone-800 font-bold rounded-xl"
          >
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Call 092 228 1940</span>
          </a>
        </div>
      )}
    </header>
  );
}
