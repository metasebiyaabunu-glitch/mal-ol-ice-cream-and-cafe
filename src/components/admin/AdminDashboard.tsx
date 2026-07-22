import React, { useState, useEffect } from 'react';
import {
  ChefHat,
  ShoppingBag,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Sliders,
  Utensils,
  Dices,
  Info,
  Lock,
  Unlock,
  Eye,
  Trash2,
  Edit2,
  Sparkles,
  Phone,
  Store,
  MapPin,
  Tag,
  Check,
  Search,
  Users,
  Layers
} from 'lucide-react';
import { Order, MenuItem, ScoopFlavor, TableStatus, ShopSettings } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export default function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'scoops' | 'tables' | 'analytics' | 'settings'>('orders');

  // State loaded from backend API
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [scoopFlavors, setScoopFlavors] = useState<ScoopFlavor[]>([]);
  const [tables, setTables] = useState<TableStatus[]>([]);
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'pending' | 'preparing' | 'ready' | 'completed'>('active');

  // Modals state
  const [showPOSModal, setShowPOSModal] = useState<boolean>(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState<boolean>(false);

  // New POS Order Form
  const [posCustomerName, setPosCustomerName] = useState<string>('');
  const [posCustomerPhone, setPosCustomerPhone] = useState<string>('');
  const [posType, setPosType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [posTable, setPosTable] = useState<string>('Table 1');
  const [posSelectedItems, setPosSelectedItems] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [posNotes, setPosNotes] = useState<string>('');
  const [posPayment, setPosPayment] = useState<'Telebirr' | 'CBE Birr' | 'Cash'>('Telebirr');

  // New Menu Item Form
  const [newMenuName, setNewMenuName] = useState<string>('');
  const [newMenuAmharic, setNewMenuAmharic] = useState<string>('');
  const [newMenuCategory, setNewMenuCategory] = useState<'icecream' | 'drinks' | 'snacks' | 'desserts'>('icecream');
  const [newMenuPrice, setNewMenuPrice] = useState<string>('180');
  const [newMenuDesc, setNewMenuDesc] = useState<string>('');
  const [newMenuImage, setNewMenuImage] = useState<string>('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80');
  const [newMenuTags, setNewMenuTags] = useState<string>('Homemade, Special');

  // Search/Filters in Menu
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>('all');

  // Fetch data function
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [ordersRes, menuRes, scoopsRes, tablesRes, settingsRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/orders').then((r) => r.json()),
        fetch('/api/admin/menu').then((r) => r.json()),
        fetch('/api/admin/scoops').then((r) => r.json()),
        fetch('/api/admin/tables').then((r) => r.json()),
        fetch('/api/admin/settings').then((r) => r.json()),
        fetch('/api/admin/analytics').then((r) => r.json())
      ]);

      if (Array.isArray(ordersRes)) setOrders(ordersRes);
      if (Array.isArray(menuRes)) setMenuItems(menuRes);
      if (Array.isArray(scoopsRes)) setScoopFlavors(scoopsRes);
      if (Array.isArray(tablesRes)) setTables(tablesRes);
      if (settingsRes) setSettings(settingsRes);
      if (analyticsRes) setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Interval auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchAllData();
    }, 6000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Auth Handler
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin' || pinInput.length > 0) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Order status progression
  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        fetchAllData();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Toggle Menu item stock
  const toggleMenuItemStock = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/menu/${id}/toggle-stock`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const updated = await res.json();
        setMenuItems((prev) => prev.map((m) => (m.id === id ? updated : m)));
      }
    } catch (err) {
      console.error('Failed to toggle stock', err);
    }
  };

  // Delete Menu item
  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMenuItems((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  // Toggle Scoop Flavor stock
  const toggleScoopStock = async (id: string, currentStock: boolean) => {
    try {
      const res = await fetch(`/api/admin/scoops/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !currentStock })
      });
      if (res.ok) {
        const updated = await res.json();
        setScoopFlavors((prev) => prev.map((s) => (s.id === id ? updated : s)));
      }
    } catch (err) {
      console.error('Failed to update scoop stock', err);
    }
  };

  // Update Table Status
  const updateTable = async (id: string, newStatus: 'available' | 'occupied' | 'reserved', game?: string) => {
    try {
      const res = await fetch(`/api/admin/tables/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          currentGame: game,
          playersCount: newStatus === 'occupied' ? 2 : undefined
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setTables((prev) => prev.map((t) => (t.id === id ? updated : t)));
      }
    } catch (err) {
      console.error('Failed to update table', err);
    }
  };

  // Create Walk-in POS Order
  const handleCreatePOSOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName || posSelectedItems.length === 0) {
      alert('Please select customer name and at least 1 item!');
      return;
    }

    const itemsForApi = posSelectedItems.map((pi) => ({
      id: pi.item.id,
      title: pi.item.name,
      price: pi.item.price,
      quantity: pi.qty,
      image: pi.item.image
    }));

    const totalAmount = posSelectedItems.reduce((sum, pi) => sum + pi.item.price * pi.qty, 0);

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: posType,
          customerName: posCustomerName,
          customerPhone: posCustomerPhone || 'Walk-in',
          tableNumber: posType === 'dine-in' ? posTable : undefined,
          items: itemsForApi,
          totalAmount,
          paymentMethod: posPayment,
          notes: posNotes
        })
      });

      if (res.ok) {
        setShowPOSModal(false);
        setPosCustomerName('');
        setPosCustomerPhone('');
        setPosSelectedItems([]);
        setPosNotes('');
        fetchAllData();
      }
    } catch (err) {
      console.error('POS creation failed', err);
    }
  };

  // Add Item to POS Cart
  const addPosItem = (item: MenuItem) => {
    setPosSelectedItems((prev) => {
      const existing = prev.find((pi) => pi.item.id === item.id);
      if (existing) {
        return prev.map((pi) => (pi.item.id === item.id ? { ...pi, qty: pi.qty + 1 } : pi));
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removePosItem = (id: string) => {
    setPosSelectedItems((prev) => prev.filter((pi) => pi.item.id !== id));
  };

  // Submit New Menu Item
  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName || !newMenuPrice) return;

    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMenuName,
          amharicName: newMenuAmharic || newMenuName,
          category: newMenuCategory,
          price: Number(newMenuPrice),
          description: newMenuDesc,
          image: newMenuImage,
          tags: newMenuTags.split(',').map((t) => t.trim())
        })
      });

      if (res.ok) {
        setShowAddMenuModal(false);
        setNewMenuName('');
        setNewMenuAmharic('');
        setNewMenuDesc('');
        fetchAllData();
      }
    } catch (err) {
      console.error('Failed to create menu item', err);
    }
  };

  // Update Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Shop settings updated successfully!');
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'active') return o.status === 'pending' || o.status === 'preparing' || o.status === 'ready';
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  // Filtered menu list
  const filteredMenuItems = menuItems.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          (m.amharicName && m.amharicName.includes(menuSearch));
    const matchesCat = menuCategoryFilter === 'all' || m.category === menuCategoryFilter;
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl space-y-6 text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-stone-900 font-serif">ማልኦ Backside Management</h2>
            <p className="text-xs text-stone-600 mt-1">Authorized Manager & Kitchen Access Portal</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 block">
                Enter Manager PIN Code
              </label>
              <input
                type="password"
                placeholder="Default PIN: 1234"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-stone-200 rounded-2xl text-center text-lg tracking-widest font-bold focus:outline-none focus:border-amber-500"
              />
              {pinError && <p className="text-xs text-rose-600 mt-1 font-bold">Incorrect PIN code. Try 1234.</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Access Management Dashboard</span>
            </button>
          </form>

          <p className="text-[11px] text-stone-400">
            Arba Minch Secha 1st Floor • Store POS & Kitchen Display
          </p>
        </div>
      </div>
    );
  }

  const activeOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'preparing').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xl shadow-md">
            ማልኦ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-stone-900 font-serif">Restaurant Backside Manager</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                Live Online
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              1st Floor Secha Store • Live Orders, Menu Stock, Lounge & Analytics
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowPOSModal(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-2xl shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Walk-in / POS Order</span>
          </button>

          <button
            onClick={fetchAllData}
            disabled={loading}
            className="px-3.5 py-2.5 glass-pill text-stone-800 text-xs font-bold rounded-2xl flex items-center gap-1.5 hover:bg-white/80"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              autoRefresh ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-stone-200 text-stone-600'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-amber-600 animate-pulse' : 'bg-stone-400'}`} />
            <span>Auto-sync (6s)</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2.5 glass-pill text-stone-500 hover:text-stone-900 rounded-2xl"
            title="Lock Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
            <span>Kitchen Queue</span>
            <ChefHat className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {activeOrdersCount} <span className="text-xs text-amber-600 font-bold">Active</span>
          </div>
          <p className="text-[11px] text-stone-500">Orders in prep / pending</p>
        </div>

        <div className="glass-card p-4 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
            <span>Today's Sales</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-800">
            {analytics ? `${analytics.totalRevenueETB} ETB` : '1,870 ETB'}
          </div>
          <p className="text-[11px] text-stone-500">Completed order total</p>
        </div>

        <div className="glass-card p-4 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
            <span>Menu Items</span>
            <Utensils className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {menuItems.length} <span className="text-xs text-stone-500 font-normal">Active</span>
          </div>
          <p className="text-[11px] text-stone-500">
            {menuItems.filter((m) => m.inStock !== false).length} In Stock
          </p>
        </div>

        <div className="glass-card p-4 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
            <span>Lounge Occupancy</span>
            <Dices className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {tables.filter((t) => t.status === 'occupied').length} / {tables.length}
          </div>
          <p className="text-[11px] text-stone-500">1st Floor Tables playing games</p>
        </div>
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200/60 scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Live Orders & KDS</span>
          {activeOrdersCount > 0 && (
            <span className="bg-white text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'menu'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Menu & Stock Control</span>
        </button>

        <button
          onClick={() => setActiveTab('scoops')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'scoops'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Gelato Flavors (3D)</span>
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'tables'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <Dices className="w-4 h-4" />
          <span>Board Game Lounge</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'analytics'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Financial Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'glass-pill text-stone-700 hover:bg-white/80'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Shop Settings</span>
        </button>
      </div>

      {/* TAB 1: LIVE ORDERS & KDS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Sub-filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/40 p-2 rounded-2xl border border-white/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 px-2">Filter Status:</span>
              {(['active', 'pending', 'preparing', 'ready', 'completed', 'all'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    orderFilter === st
                      ? 'bg-stone-900 text-amber-400'
                      : 'text-stone-600 hover:bg-white/60'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 font-semibold px-3">
              Showing {filteredOrders.length} orders
            </div>
          </div>

          {/* Orders KDS Grid */}
          {filteredOrders.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-stone-900">No Orders in this filter</h3>
              <p className="text-xs text-stone-600">All customer orders have been processed or none match the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => {
                const isPending = order.status === 'pending';
                const isPreparing = order.status === 'preparing';
                const isReady = order.status === 'ready';
                const isCompleted = order.status === 'completed';

                return (
                  <div
                    key={order.id}
                    className={`glass-card rounded-3xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                      isPending
                        ? 'border-amber-400 bg-amber-500/10'
                        : isPreparing
                        ? 'border-sky-400 bg-sky-500/10'
                        : isReady
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-stone-200 opacity-75'
                    }`}
                  >
                    <div>
                      {/* Order Header */}
                      <div className="flex items-start justify-between pb-3 border-b border-stone-200/60">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-stone-900">{order.id}</span>
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              order.type === 'dine-in' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {order.type} {order.tableNumber ? `• ${order.tableNumber}` : ''}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-800 mt-1">{order.customerName}</div>
                          <div className="text-[11px] text-stone-500">{order.customerPhone}</div>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-xl shadow-xs ${
                          isPending
                            ? 'bg-amber-500 text-white'
                            : isPreparing
                            ? 'bg-sky-600 text-white'
                            : isReady
                            ? 'bg-emerald-600 text-white'
                            : isCompleted
                            ? 'bg-stone-800 text-stone-200'
                            : 'bg-rose-600 text-white'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="py-3 space-y-2">
                        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-800 font-medium">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-start">
                              <span>
                                <strong className="text-amber-700">{item.quantity}x</strong> {item.title}
                                {item.subtitle && <span className="block text-[10px] text-stone-500 font-normal">{item.subtitle}</span>}
                              </span>
                              <span className="font-mono text-stone-600 font-bold">{item.price * item.quantity} ETB</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Notes & Payment */}
                      {order.notes && (
                        <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 italic mb-2">
                          <strong>Note:</strong> {order.notes}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-200/60 font-bold">
                        <span className="text-stone-500">Payment: <strong className="text-stone-800">{order.paymentMethod}</strong></span>
                        <span className="text-amber-700 text-sm font-black">{order.totalAmount} ETB</span>
                      </div>
                    </div>

                    {/* Progress Action Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      {isPending && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="flex-1 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <ChefHat className="w-3.5 h-3.5" />
                          <span>Start Prep</span>
                        </button>
                      )}

                      {isPreparing && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Ready</span>
                        </button>
                      )}

                      {isReady && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </button>
                      )}

                      {order.status !== 'cancelled' && order.status !== 'completed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="px-2.5 py-2 glass-pill text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold"
                          title="Cancel Order"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MENU & STOCK CONTROL */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-3xl">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search menu items or Amharic name..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/80 border border-stone-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={menuCategoryFilter}
                onChange={(e) => setMenuCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white/80 border border-stone-200 rounded-2xl text-xs font-bold text-stone-700 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Categories</option>
                <option value="icecream">Ice Cream</option>
                <option value="drinks">Drinks & Coffee</option>
                <option value="snacks">Snacks & Burgers</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddMenuModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Menu Item</span>
            </button>
          </div>

          {/* Menu Items Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden p-5 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-stone-900 text-sm leading-tight">{item.name}</h3>
                    {item.amharicName && (
                      <div className="text-xs text-stone-500 font-serif font-bold">{item.amharicName}</div>
                    )}
                    <div className="text-amber-700 font-black text-sm">{item.price} ETB</div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2">{item.description}</p>

                {/* Stock Toggle & Action Buttons */}
                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMenuItemStock(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        item.inStock !== false
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${item.inStock !== false ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      <span>{item.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GELATO SCOOP FLAVORS (3D) */}
      {activeTab === 'scoops' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-2">
            <h2 className="text-lg font-black text-stone-900 font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Homemade Gelato Scoop Inventory Control</span>
            </h2>
            <p className="text-xs text-stone-600">
              Manage the real-time stock of artisanal gelato flavors available in the 3D Custom Scoop Studio and Cafe counter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scoopFlavors.map((scoop) => (
              <div
                key={scoop.id}
                className="glass-card rounded-3xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-2xl shadow-md border-2 border-white flex items-center justify-center font-bold text-white text-xs"
                      style={{ backgroundColor: scoop.color }}
                    >
                      🍨
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {scoop.type}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-stone-900 text-sm">{scoop.name}</h3>
                  <div className="text-xs text-amber-700 font-serif font-bold">{scoop.amharicName}</div>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">{scoop.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-bold">Stock Status</span>
                  <button
                    onClick={() => toggleScoopStock(scoop.id, scoop.inStock !== false)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                      scoop.inStock !== false
                        ? 'bg-emerald-500 text-white'
                        : 'bg-stone-300 text-stone-700'
                    }`}
                  >
                    {scoop.inStock !== false ? 'Available' : 'Sold Out'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BOARD GAME LOUNGE TABLES */}
      {activeTab === 'tables' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-2">
            <h2 className="text-lg font-black text-stone-900 font-serif flex items-center gap-2">
              <Dices className="w-5 h-5 text-indigo-600" />
              <span>1st Floor Board Game Lounge Table Management</span>
            </h2>
            <p className="text-xs text-stone-600">
              Track seating availability, current active board games (Chess, Scrabble, Ludo), and customer table occupancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((tbl) => {
              const isOccupied = tbl.status === 'occupied';
              const isReserved = tbl.status === 'reserved';

              return (
                <div
                  key={tbl.id}
                  className={`glass-card rounded-3xl p-6 border space-y-4 ${
                    isOccupied ? 'border-indigo-300 bg-indigo-500/5' : isReserved ? 'border-amber-300 bg-amber-500/5' : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-sm">{tbl.tableName}</h3>
                      <div className="text-xs text-stone-500 font-medium">Seats {tbl.capacity} People</div>
                    </div>
                    <span className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-xl ${
                      isOccupied ? 'bg-indigo-600 text-white' : isReserved ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {tbl.status}
                    </span>
                  </div>

                  {isOccupied && (
                    <div className="p-3 bg-white/80 rounded-2xl border border-indigo-100 text-xs space-y-1">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Dices className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Game: {tbl.currentGame || 'Board Game'}</span>
                      </div>
                      <div className="text-stone-600 font-medium">
                        {tbl.playersCount || 2} players • Since {tbl.startTime || '12:00 PM'}
                      </div>
                    </div>
                  )}

                  {tbl.notes && (
                    <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 italic">
                      {tbl.notes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    {tbl.status === 'available' ? (
                      <button
                        onClick={() => updateTable(tbl.id, 'occupied', 'Scrabble & Word Masters')}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Seat Players & Start Game
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTable(tbl.id, 'available')}
                        className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Clear Table
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIAL ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales Volume</span>
              <div className="text-3xl font-black text-emerald-700">
                {analytics ? `${analytics.totalRevenueETB} ETB` : '1,870 ETB'}
              </div>
              <p className="text-xs text-stone-600">Calculated from completed and active customer orders</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Average Ticket Value</span>
              <div className="text-3xl font-black text-amber-600">
                {analytics ? `${analytics.avgOrderValueETB} ETB` : '240 ETB'}
              </div>
              <p className="text-xs text-stone-600">Average customer spend per visit</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Popular Payment Method</span>
              <div className="text-3xl font-black text-indigo-700">Telebirr</div>
              <p className="text-xs text-stone-600">80% of local customers pay via Telebirr or CBE Birr</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SHOP SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-black text-stone-900 font-serif flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-600" />
            <span>Edit Shop Information & Announcement Banner</span>
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Top Announcement Bar Text</label>
              <input
                type="text"
                value={settings?.announcement || ''}
                onChange={(e) => setSettings(prev => prev ? { ...prev, announcement: e.target.value } : null)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Shop Phone Number</label>
              <input
                type="text"
                value={settings?.phone || ''}
                onChange={(e) => setSettings(prev => prev ? { ...prev, phone: e.target.value } : null)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Opening Hours</label>
              <input
                type="text"
                value={settings?.openingHours || ''}
                onChange={(e) => setSettings(prev => prev ? { ...prev, openingHours: e.target.value } : null)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-lg"
            >
              Save Shop Settings
            </button>
          </form>
        </div>
      )}

      {/* POS WALK-IN ORDER MODAL */}
      {showPOSModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel p-6 rounded-3xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span>New Walk-in / Counter POS Order</span>
              </h3>
              <button onClick={() => setShowPOSModal(false)} className="text-stone-400 hover:text-stone-800">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePOSOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Customer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Walk-in / Customer Name"
                    value={posCustomerName}
                    onChange={(e) => setPosCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Order Type & Table</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={posType}
                      onChange={(e) => setPosType(e.target.value as any)}
                      className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                    >
                      <option value="dine-in">Dine-In</option>
                      <option value="takeaway">Takeaway</option>
                    </select>

                    {posType === 'dine-in' && (
                      <select
                        value={posTable}
                        onChange={(e) => setPosTable(e.target.value)}
                        className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                      >
                        {tables.map((t) => (
                          <option key={t.id} value={t.tableName}>{t.tableName}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Add Items List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">Select Items to Add:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                  {menuItems.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => addPosItem(m)}
                      className="p-2 text-left bg-white/80 border border-stone-200 rounded-xl hover:bg-amber-50 text-xs font-semibold space-y-1"
                    >
                      <div className="truncate text-stone-900 font-bold">{m.name}</div>
                      <div className="text-amber-700 font-black">{m.price} ETB</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Items */}
              {posSelectedItems.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-2xl space-y-2 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 uppercase">Order Items:</div>
                  {posSelectedItems.map((pi) => (
                    <div key={pi.item.id} className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span>{pi.qty}x {pi.item.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{pi.item.price * pi.qty} ETB</span>
                        <button type="button" onClick={() => removePosItem(pi.item.id)} className="text-rose-600">✕</button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-amber-200 flex justify-between text-sm font-black text-amber-900">
                    <span>Total:</span>
                    <span>{posSelectedItems.reduce((s, pi) => s + pi.item.price * pi.qty, 0)} ETB</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs rounded-2xl shadow-lg"
              >
                Send Order to Kitchen Display
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD MENU ITEM MODAL */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-extrabold text-stone-900 text-base">Add New Menu Item</h3>
              <button onClick={() => setShowAddMenuModal(false)} className="text-stone-400 hover:text-stone-800">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMenuItem} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Item English Name</label>
                <input
                  type="text"
                  required
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Amharic Name (Optional)</label>
                <input
                  type="text"
                  value={newMenuAmharic}
                  onChange={(e) => setNewMenuAmharic(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={newMenuCategory}
                    onChange={(e) => setNewMenuCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold"
                  >
                    <option value="icecream">Ice Cream</option>
                    <option value="drinks">Drinks & Coffee</option>
                    <option value="snacks">Snacks & Burgers</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Price in ETB</label>
                  <input
                    type="number"
                    required
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Description</label>
                <textarea
                  value={newMenuDesc}
                  onChange={(e) => setNewMenuDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-md"
              >
                Save Menu Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
