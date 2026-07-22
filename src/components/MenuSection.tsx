import React, { useState } from 'react';
import { Search, Plus, Star, Heart, Info, Filter, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/maloData';
import { MenuItem, CartItem } from '../types';

interface MenuProps {
  onAddToCart: (item: CartItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Delights' },
    { id: 'icecream', label: 'Homemade Ice Cream' },
    { id: 'snacks', label: 'Burgers & Snacks' },
    { id: 'drinks', label: 'Coffee & Juices' },
    { id: 'desserts', label: 'Sundae Desserts' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.amharicName && item.amharicName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart({
      id: item.id,
      title: item.name,
      subtitle: item.amharicName,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          ማልኦ Delicious Menu
        </h2>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Every item is prepared fresh using local ingredients from Arba Minch—from sweet mango gelato to crispy french fries and avocado burgers.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'glass-pill text-stone-700 hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search Mango, Coffee, Burger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.popular && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      Popular
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                        {item.name}
                      </h3>
                      {item.amharicName && (
                        <p className="text-xs text-amber-700 font-bold mt-0.5">
                          {item.amharicName}
                        </p>
                      )}
                    </div>
                    <span className="font-black text-amber-600 text-base shrink-0">
                      {item.price} ETB
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => handleQuickAdd(item)}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-stone-500 font-medium">No items found matching your search.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="relative h-56 bg-stone-100">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-stone-900/80 text-white p-2 rounded-full text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-stone-900">{selectedItem.name}</h3>
                  <span className="text-lg font-black text-amber-600">{selectedItem.price} ETB</span>
                </div>
                {selectedItem.amharicName && (
                  <p className="text-sm font-bold text-amber-700">{selectedItem.amharicName}</p>
                )}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">{selectedItem.description}</p>

              {selectedItem.ingredients && (
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Fresh Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-lg">
                        • {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    handleQuickAdd(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Order • {selectedItem.price} ETB</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
