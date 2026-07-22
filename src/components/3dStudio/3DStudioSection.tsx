import React, { useState } from 'react';
import { Plus, Trash2, RotateCw, Sparkles, ShoppingBag, Check, Info } from 'lucide-react';
import IceCreamCone3D from '../3d/IceCreamCone3D';
import { SCOOP_FLAVORS, SHOP_INFO } from '../../data/maloData';
import { CustomIceCream, ScoopFlavor, CartItem } from '../../types';
import confetti from 'canvas-confetti';

interface StudioProps {
  onAddToCart: (item: CartItem) => void;
  onNavigateMenu?: () => void;
}

export default function ThreeDStudioSection({ onAddToCart }: StudioProps) {
  const [container, setContainer] = useState<'waffle-cone' | 'sugar-cone' | 'waffle-bowl' | 'eco-cup'>('waffle-cone');
  const [selectedScoops, setSelectedScoops] = useState<ScoopFlavor[]>([
    SCOOP_FLAVORS[0], // Mango Banana
    SCOOP_FLAVORS[1]  // Chocolate Caramel
  ]);
  const [toppings, setToppings] = useState<string[]>(['sprinkles', 'fruits']);
  const [syrup, setSyrup] = useState<string>('caramel');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Price calculation
  const basePrices = {
    'waffle-cone': 40,
    'sugar-cone': 30,
    'waffle-bowl': 50,
    'eco-cup': 20
  };

  const scoopPrice = 70; // per scoop
  const totalPrice = basePrices[container] + selectedScoops.length * scoopPrice + toppings.length * 15;

  const handleAddScoop = (flavor: ScoopFlavor) => {
    if (selectedScoops.length < 4) {
      setSelectedScoops([...selectedScoops, flavor]);
    }
  };

  const handleRemoveScoop = (index: number) => {
    if (selectedScoops.length > 1) {
      setSelectedScoops(selectedScoops.filter((_, i) => i !== index));
    }
  };

  const toggleTopping = (toppingId: string) => {
    if (toppings.includes(toppingId)) {
      setToppings(toppings.filter(t => t !== toppingId));
    } else {
      setToppings([...toppings, toppingId]);
    }
  };

  const handleAddToCart = () => {
    const customCreation: CustomIceCream = {
      container,
      scoops: selectedScoops,
      toppings,
      syrup,
      totalPrice
    };

    const scoopNames = selectedScoops.map(s => s.name).join(' & ');

    onAddToCart({
      id: `custom-3d-${Date.now()}`,
      title: `Custom 3D ${container.replace('-', ' ').toUpperCase()}`,
      subtitle: scoopNames,
      price: totalPrice,
      quantity: 1,
      isCustom3D: true,
      details: customCreation
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive 3D Gelato Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          Craft Your 3D Ice Cream Creation
        </h2>
        <p className="mt-2 text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
          Stack fresh scoops, pick crunchy waffle cones, add natural toppings, and view your custom Mal-o ice cream from any 3D angle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 3D WebGL Canvas Display */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-bold text-stone-700 border border-stone-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live 3D Render</span>
            </div>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
            </button>
          </div>

          {/* Interactive Three.js View */}
          <div className="w-full h-[360px] sm:h-[420px] my-auto">
            <IceCreamCone3D
              container={container}
              scoops={selectedScoops}
              toppings={toppings}
              syrup={syrup}
              autoRotate={autoRotate}
            />
          </div>

          {/* Canvas Drag Hint */}
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-100 text-xs text-stone-600 z-10">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Drag to spin in 3D • Touch or click to view from all sides</span>
            </div>
            <span className="font-extrabold text-amber-600 text-sm">{totalPrice} ETB</span>
          </div>
        </div>

        {/* Customization Control Panel */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-6">
          {/* 1. Container Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 block">
              1. Choose Base Vessel
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'waffle-cone', label: 'Waffle Cone', price: '+40 ETB' },
                { id: 'sugar-cone', label: 'Sugar Cone', price: '+30 ETB' },
                { id: 'waffle-bowl', label: 'Waffle Bowl', price: '+50 ETB' },
                { id: 'eco-cup', label: 'Eco Cup', price: '+20 ETB' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setContainer(c.id as any)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    container === c.id
                      ? 'border-amber-500 bg-amber-50/60 font-bold text-amber-900 shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:border-amber-300'
                  }`}
                >
                  <div className="text-sm">{c.label}</div>
                  <div className="text-xs text-amber-700 font-medium">{c.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Stacked Scoops List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                2. Stacked Scoops ({selectedScoops.length}/4)
              </label>
              <span className="text-xs text-stone-500 font-medium">+70 ETB per scoop</span>
            </div>

            {/* Current Selected Scoops Stack */}
            <div className="space-y-2 mb-4">
              {selectedScoops.map((scoop, index) => (
                <div
                  key={`${scoop.id}-${index}`}
                  className="flex items-center justify-between p-2.5 bg-stone-50 rounded-2xl border border-stone-200"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: scoop.color }}
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{scoop.name}</div>
                      <div className="text-[10px] text-stone-500">{scoop.amharicName}</div>
                    </div>
                  </div>
                  {selectedScoops.length > 1 && (
                    <button
                      onClick={() => handleRemoveScoop(index)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Remove scoop"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Flavor Buttons */}
            {selectedScoops.length < 4 ? (
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {SCOOP_FLAVORS.map((flavor) => (
                  <button
                    key={flavor.id}
                    onClick={() => handleAddScoop(flavor)}
                    className="p-2 bg-stone-50 hover:bg-amber-100/70 rounded-xl border border-stone-200 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <span className="text-xs font-semibold text-stone-800 truncate">
                        {flavor.name}
                      </span>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-xl text-center font-medium">
                Maximum 4 scoops reached for stability!
              </p>
            )}
          </div>

          {/* 3. Syrup Drizzle */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 block">
              3. Select Drizzle Syrup
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'caramel', label: 'Caramel', color: '#C87B28' },
                { id: 'chocolate', label: 'Chocolate', color: '#2B1704' },
                { id: 'honey', label: 'Honey', color: '#E5A93C' },
                { id: 'none', label: 'None', color: '#E5E7EB' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSyrup(s.id)}
                  className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                    syrup === s.id
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-stone-200 text-stone-600 hover:border-amber-300'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: s.color }}
                  />
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Topping Accents */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 block">
              4. Crunch & Toppings (+15 ETB each)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sprinkles', label: 'Sprinkles' },
                { id: 'nuts', label: 'Roasted Nuts' },
                { id: 'fruits', label: 'Fresh Fruits' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    toppings.includes(t.id)
                      ? 'border-amber-500 bg-amber-500 text-white shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {toppings.includes(t.id) && <Check className="w-3.5 h-3.5" />}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all flex items-center justify-center gap-3 shadow-lg ${
                addedAnimation
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-orange-500/30 hover:opacity-95'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>
                {addedAnimation ? 'Added 3D Gelato to Order!' : `Add 3D Creation to Order • ${totalPrice} ETB`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
