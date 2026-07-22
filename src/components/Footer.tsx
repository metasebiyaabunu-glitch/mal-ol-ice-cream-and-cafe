import React from 'react';
import { Star, Phone, MapPin, Heart, Sparkles } from 'lucide-react';
import { SHOP_INFO } from '../data/maloData';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export default function Footer({ onNavigateTab }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                ማ
              </div>
              <div>
                <span className="font-extrabold text-2xl text-white font-serif">ማልኦ</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full ml-2">
                  Mal-o
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Arba Minch's favorite destination for homemade artisanal gelato, sweet mango banana scoops, fresh avocado burgers, Ethiopian coffee, and board game lounge.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
              <span>{SHOP_INFO.rating} Rating on Google Maps (16 Reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigateTab('3d-studio')} className="hover:text-amber-400 transition-colors">
                  3D Ice Cream Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('menu')} className="hover:text-amber-400 transition-colors">
                  Menu & Snacks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('board-games')} className="hover:text-amber-400 transition-colors">
                  Board Game Lounge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ai-crafter')} className="hover:text-amber-400 transition-colors">
                  AI Flavor Crafter
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Visit Us</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{SHOP_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`} className="text-white hover:underline font-bold">
                  {SHOP_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2 text-center sm:text-left">
          <div>© {new Date().getFullYear()} ማልኦ (Mal-o) Ice Cream & Cafe. All rights reserved.</div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Arba Minch, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
