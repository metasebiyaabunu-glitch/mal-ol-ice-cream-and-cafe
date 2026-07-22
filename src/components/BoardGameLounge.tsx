import React, { useState } from 'react';
import { Gamepad2, Sparkles, Award, RotateCcw, Trophy, Users } from 'lucide-react';
import { BOARD_GAMES, SHOP_INFO } from '../data/maloData';
import confetti from 'canvas-confetti';

export default function BoardGameLounge() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<string | null>(null);

  const prizes = [
    'Free Extra Topping!',
    '10% Off Any Gelato',
    'Free Macchiato Coffee',
    '50 ETB Gelato Discount',
    'Free Waffle Upgrade',
    'Bonus Board Game Points'
  ];

  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setPrize(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins * 360 + randomDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const prizeIndex = Math.floor((randomDegrees / 360) * prizes.length);
      const wonPrize = prizes[prizeIndex % prizes.length];
      setPrize(wonPrize);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
          <Gamepad2 className="w-4 h-4 text-amber-600" />
          <span>Mal-o Board Game Lounge • 1st Floor</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          Play Board Games with Friends & Gelato
        </h2>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
          "Besides that it is a nice place to be. With the possibility of playing board games!" — Jan van Beek (Google Local Guide)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Games Catalog */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xl font-extrabold text-stone-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>Games Available at the Lounge</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BOARD_GAMES.map((game) => (
              <div
                key={game.id}
                className="p-5 glass-card glass-card-hover rounded-3xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2 bg-amber-100 text-amber-800 rounded-xl font-bold text-xs flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-amber-600" />
                    <span>{game.players}</span>
                  </span>
                  <span className="text-xs bg-stone-100 text-stone-700 font-bold px-2.5 py-1 rounded-full">
                    {game.difficulty}
                  </span>
                </div>
                <h4 className="font-extrabold text-stone-900 text-base">{game.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{game.description}</p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 text-stone-800 flex items-center gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-sm">Free to Play for Guests</div>
              <div className="text-xs text-stone-600 mt-0.5">
                All board games are complimentary for anyone ordering ice cream, coffee, or snacks at Mal-o cafe!
              </div>
            </div>
          </div>
        </div>

        {/* Right Interactive Spin Game Wheel */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 text-center space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interactive Lounge Game</span>
            </div>
            <h3 className="text-2xl font-black text-stone-900">Spin the Gelato Wheel</h3>
            <p className="text-xs text-stone-500 mt-1">
              Spin to win discount vouchers or extra toppings on your Mal-o visit!
            </p>
          </div>

          {/* Wheel Graphic Container */}
          <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
            {/* Top Pointer */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-600 drop-shadow-md" />

            {/* Rotating Wheel */}
            <div
              className="w-full h-full rounded-full border-8 border-stone-900 shadow-2xl relative overflow-hidden transition-transform duration-[3500ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {prizes.map((p, i) => {
                const angle = (360 / prizes.length) * i;
                const colors = ['#FFB800', '#FF8C00', '#7DA042', '#6F4E37', '#FF4D6D', '#4A2511'];
                return (
                  <div
                    key={i}
                    className="absolute w-full h-full text-white font-extrabold text-[10px] flex items-center justify-center pt-2"
                    style={{
                      backgroundColor: colors[i % colors.length],
                      clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%'
                    }}
                  >
                    <span className="rotate-90 origin-center text-stone-900 font-extrabold text-[9px] max-w-[60px] text-center leading-tight">
                      {p}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Center Hub */}
            <div className="absolute w-12 h-12 rounded-full bg-stone-900 text-amber-400 font-black text-xs flex items-center justify-center border-2 border-white z-10 shadow-lg">
              ማልኦ
            </div>
          </div>

          {/* Prize Banner Result */}
          {prize ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 animate-in fade-in zoom-in">
              <Award className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <div className="font-extrabold text-base">You Won: {prize}!</div>
              <div className="text-xs text-emerald-700 mt-1">
                Show this code to Mal-o staff on arrival: <span className="font-mono font-bold bg-emerald-200 px-2 py-0.5 rounded">MALO-LUCKY</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSpinWheel}
              disabled={spinning}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-base rounded-2xl shadow-lg shadow-orange-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
              <span>{spinning ? 'Spinning Gelato Wheel...' : 'Spin the Board Wheel!'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
