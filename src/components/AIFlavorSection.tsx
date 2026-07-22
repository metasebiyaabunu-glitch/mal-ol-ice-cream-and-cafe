import React, { useState } from 'react';
import { Sparkles, Loader2, Lightbulb, RefreshCw, ShoppingBag } from 'lucide-react';
import IceCreamCone3D from './3d/IceCreamCone3D';
import { ScoopFlavor, CartItem, AIFlavorResult } from '../types';
import confetti from 'canvas-confetti';

interface AIFlavorProps {
  onAddToCart: (item: CartItem) => void;
}

export default function AIFlavorSection({ onAddToCart }: AIFlavorProps) {
  const [mood, setMood] = useState<string>('Adventurous');
  const [preference, setPreference] = useState<string>('Local Tropical Mango & Honey');
  const [dietary, setDietary] = useState<string>('None');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIFlavorResult | null>({
    flavorName: 'Arba Minch Tropical Fusion (ማልኦ AI Special)',
    description: 'Fresh local mangoes blended with sweet banana gelato, wild mountain honey drizzle, and roasted sesame crunch.',
    scoopColors: ['#FFB800', '#FF8C00'],
    topping: 'Mango wedges & Toasted sesame',
    pairing: 'Iced Ethiopian Black Coffee'
  });

  const handleGenerateAI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recommend-flavor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, preference, dietary })
      });
      const data = await response.json();
      setAiResult(data);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to generate AI flavor', err);
    } finally {
      setLoading(false);
    }
  };

  const currentAIScoops: ScoopFlavor[] = aiResult
    ? [
        {
          id: 'ai-scoop-1',
          name: aiResult.flavorName,
          amharicName: 'የአርቲፊሻል ኢንቴሊጀንስ ፍላወር',
          color: aiResult.scoopColors?.[0] || '#FFB800',
          secondaryColor: aiResult.scoopColors?.[1] || '#FF8C00',
          description: aiResult.description,
          type: 'special'
        },
        {
          id: 'ai-scoop-2',
          name: 'Sweet Honey Twist',
          amharicName: 'ማር አይስክሬም',
          color: aiResult.scoopColors?.[1] || '#FFE600',
          description: 'Complementary honey gelato',
          type: 'special'
        }
      ]
    : [];

  const handleAddAIToOrder = () => {
    if (!aiResult) return;
    onAddToCart({
      id: `ai-flavor-${Date.now()}`,
      title: aiResult.flavorName,
      subtitle: aiResult.pairing,
      price: 220,
      quantity: 1
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3.5 py-1 rounded-full mb-3 shadow-md shadow-orange-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini AI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
          AI Gelato Artisan & Flavor Recommender
        </h2>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
          Tell Gemini AI your cravings and mood, and our virtual Mal-o artisan will invent a custom Ethiopian ice cream recipe and render it live in 3D!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Form */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-5">
          <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>Customize Your AI Craving</span>
          </h3>

          {/* Mood Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              Current Vibe / Mood
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Adventurous', 'Relaxed', 'Energetic', 'Romantic', 'Cozy', 'Refreshed'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    mood === m
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Preference Input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">
              Taste Notes & Ingredients You Love
            </label>
            <input
              type="text"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              placeholder="e.g. Ethiopian coffee, fresh mango, chocolate fudge"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Dietary Choice */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              Dietary Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['None', 'Dairy-Free', 'Nut-Free'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDietary(d)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    dietary === d
                      ? 'bg-stone-900 text-amber-400 border-stone-900'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleGenerateAI}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Crafting Recipe with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Create AI Recipe & 3D Render</span>
              </>
            )}
          </button>
        </div>

        {/* Right Result Display with 3D Preview */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 space-y-6">
          {aiResult ? (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Gemini AI Recipe Output
                  </span>
                  <h3 className="text-2xl font-black text-stone-900 mt-2 font-serif">
                    {aiResult.flavorName}
                  </h3>
                </div>
                <span className="font-extrabold text-amber-600 text-lg">220 ETB</span>
              </div>

              <p className="text-sm text-stone-700 mt-2 leading-relaxed">{aiResult.description}</p>

              {/* 3D WebGL Model of AI Gelato */}
              <div className="w-full h-72 my-2 bg-white/60 rounded-2xl border border-amber-100 overflow-hidden">
                <IceCreamCone3D
                  container="waffle-cone"
                  scoops={currentAIScoops}
                  toppings={['sprinkles', 'fruits']}
                  syrup="honey"
                  autoRotate={true}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-stone-500 block">Recommended Topping:</span>
                  <span className="font-extrabold text-stone-900">{aiResult.topping}</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-stone-500 block">Suggested Pairing:</span>
                  <span className="font-extrabold text-stone-900">{aiResult.pairing}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddAIToOrder}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order AI Creation (220 ETB)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-stone-500 font-medium">
              Click "Create AI Recipe" to generate a unique flavor!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
