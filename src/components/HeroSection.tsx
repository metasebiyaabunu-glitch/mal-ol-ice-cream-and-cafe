import React from 'react';
import { Sparkles, Gamepad2, MapPin, ArrowRight, Star, Heart, Flame } from 'lucide-react';
import Hero3DScene from './3d/Hero3DScene';
import { SHOP_INFO } from '../data/maloData';

interface HeroProps {
  onNavigateTab: (tab: string) => void;
}

export default function HeroSection({ onNavigateTab }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-orange-50/30 to-white pt-8 pb-16 lg:py-20">
      {/* 3D Background Canvas Layer */}
      <Hero3DScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status & Rating Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="glass-pill text-amber-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.8 Rating (16 Reviews)</span>
              </span>
              <span className="glass-pill text-stone-900 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Arba Minch, Secha 1st Floor</span>
              </span>
              <span className="glass-pill text-orange-900 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-orange-600" />
                <span>Board Game Corner</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-serif leading-tight">
              Artisanal Gelato & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
                Fresh Local Flavors
              </span>{' '}
              in Arba Minch
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <span className="font-extrabold text-stone-900">ማልኦ (Mal-o)</span>! We make our homemade ice cream using fresh local mangoes, sweet bananas, and rich chocolate. Enjoy gourmet coffee, fries, avocado burgers, and board games with friends!
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigateTab('3d-studio')}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-102"
              >
                <Sparkles className="w-5 h-5" />
                <span>Build in 3D Studio</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigateTab('menu')}
                className="w-full sm:w-auto px-7 py-4 bg-white border-2 border-stone-200 hover:border-amber-400 text-stone-800 font-bold text-base rounded-2xl shadow-xs transition-all hover:bg-amber-50 flex items-center justify-center gap-2"
              >
                <span>Explore Full Menu</span>
              </button>

              <button
                onClick={() => onNavigateTab('board-games')}
                className="w-full sm:w-auto px-5 py-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-amber-700" />
                <span>Play Board Games</span>
              </button>
            </div>

            {/* Real Review Banner Highlight */}
            <div className="pt-4 border-t border-amber-200/60 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-3 glass-card p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                  SS
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <span>Sophia Sileshi</span>
                    <span className="text-amber-500">★★★★★</span>
                    <span className="text-stone-500 font-normal">• 7 months ago</span>
                  </div>
                  <p className="text-xs text-stone-700 mt-1 italic">
                    "I had the chocolate and caramel ice cream, it was really good! Perfect place for hanging out with friends on the 1st floor next to the entrance."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
              <img
                src={SHOP_INFO.heroImage}
                alt="Mal-o Artisanal Ice Cream in Arba Minch"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

              {/* Floating Menu Highlight Pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-amber-100 flex items-center gap-2.5">
                <div className="p-2 bg-amber-500 text-white rounded-xl">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-stone-900">Mango Banana Ice Cream</div>
                  <div className="text-[10px] text-amber-700 font-semibold">Local Arba Minch Mangoes</div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                      Arba Minch Specialty
                    </div>
                    <div className="text-base font-extrabold text-white">
                      Homemade Gelato & Avocado Burgers
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateTab('3d-studio')}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
