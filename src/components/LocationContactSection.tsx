import React, { useState } from 'react';
import { MapPin, Phone, Clock, Share2, Bookmark, Navigation, Send, Check } from 'lucide-react';
import { SHOP_INFO } from '../data/maloData';

export default function LocationContactSection() {
  const [isSaved, setIsSaved] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const handleSendToPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setShowSendModal(false);
      setPhoneInput('');
    }, 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
          Visit Us in Arba Minch
        </h2>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Located on the 1st floor next to the entrance in Arbaminch Secha. Come enjoy fresh ice cream and coffee!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                  ማ
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900">ማልኦ Ice Cream & Cafe</h3>
                  <span className="text-xs text-amber-700 font-bold">1st Floor • Arbaminch Secha</span>
                </div>
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-2xl border transition-all ${
                  isSaved
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
                title="Save Place"
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Address Details */}
            <div className="space-y-4 text-stone-700 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Location</div>
                  <div>{SHOP_INFO.address}</div>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">Plus Code: {SHOP_INFO.googlePlusCode}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Phone & Orders</div>
                  <a
                    href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-amber-700 font-extrabold hover:underline"
                  >
                    092 228 1940
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Opening Hours</div>
                  <div className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-0.5">
                    Open Now • Mon - Sun: 9:00 AM - 9:30 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Arba Minch 2G4Q+RV4')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </a>

            <button
              onClick={() => setShowSendModal(true)}
              className="py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 text-amber-600" />
              <span>Send to Phone</span>
            </button>
          </div>
        </div>

        {/* Map Preview & Cafe Photo */}
        <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden relative flex flex-col justify-between min-h-[420px]">
          {/* Simulated Map Render */}
          <div className="relative w-full h-full min-h-[340px] bg-stone-100">
            <img
              src={SHOP_INFO.shopVibeImage}
              alt="Mal-o Cafe Secha Arba Minch"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

            {/* Map Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-500 flex items-center gap-2 animate-bounce">
              <MapPin className="w-5 h-5 text-amber-600 fill-amber-100" />
              <div>
                <div className="text-xs font-black text-stone-900">ማልኦ Ice Cream</div>
                <div className="text-[10px] text-stone-500">Secha 1st Floor Entrance</div>
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200 text-stone-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-stone-900">Arba Minch Landmark</div>
                <div className="text-xs text-stone-600">Next to the building entrance, 1st Floor</div>
              </div>
              <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                092 228 1940
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Send to Phone Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base">Send Directions to Phone</h3>
              <button onClick={() => setShowSendModal(false)} className="text-stone-400">
                ✕
              </button>
            </div>

            {sendSuccess ? (
              <div className="py-6 text-center space-y-2 text-emerald-600">
                <Check className="w-10 h-10 mx-auto bg-emerald-100 p-2 rounded-full" />
                <div className="font-bold text-sm">Location Sent via SMS!</div>
              </div>
            ) : (
              <form onSubmit={handleSendToPhone} className="space-y-3">
                <p className="text-xs text-stone-600">
                  Enter your phone number to receive Mal-o location details and Plus Code.
                </p>
                <input
                  type="tel"
                  required
                  placeholder="0911 234 567"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-md"
                >
                  Send Details
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
