import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ThreeDStudioSection from './components/3dStudio/3DStudioSection';
import MenuSection from './components/MenuSection';
import BoardGameLounge from './components/BoardGameLounge';
import AIFlavorSection from './components/AIFlavorSection';
import ReviewsSection from './components/ReviewsSection';
import LocationContactSection from './components/LocationContactSection';
import AdminDashboard from './components/admin/AdminDashboard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, newItem];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Content View Switching */}
      <main className="flex-1">
        {activeTab === 'hero' && (
          <>
            <HeroSection onNavigateTab={setActiveTab} />
            <ThreeDStudioSection onAddToCart={handleAddToCart} />
            <MenuSection onAddToCart={handleAddToCart} />
            <BoardGameLounge />
            <AIFlavorSection onAddToCart={handleAddToCart} />
            <ReviewsSection />
            <LocationContactSection />
          </>
        )}

        {activeTab === '3d-studio' && (
          <ThreeDStudioSection onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'menu' && (
          <MenuSection onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'board-games' && (
          <BoardGameLounge />
        )}

        {activeTab === 'ai-crafter' && (
          <AIFlavorSection onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsSection />
        )}

        {activeTab === 'location' && (
          <LocationContactSection />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onNavigateTab={setActiveTab} />
        )}
      </main>

      {/* Takeaway Order Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
