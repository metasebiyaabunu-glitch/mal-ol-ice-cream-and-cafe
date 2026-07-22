export interface MenuItem {
  id: string;
  name: string;
  amharicName?: string;
  category: 'icecream' | 'drinks' | 'snacks' | 'desserts';
  price: number; // in ETB
  description: string;
  image: string;
  rating: number;
  popular?: boolean;
  inStock?: boolean;
  tags: string[];
  calories?: string;
  ingredients?: string[];
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  rating: number;
  timeAgo: string;
  comment: string;
  photos?: string[];
  likes: number;
}

export interface ScoopFlavor {
  id: string;
  name: string;
  amharicName: string;
  color: string;
  secondaryColor?: string;
  description: string;
  type: 'fruit' | 'classic' | 'special';
  inStock?: boolean;
}

export interface CustomIceCream {
  container: 'waffle-cone' | 'sugar-cone' | 'waffle-bowl' | 'eco-cup';
  scoops: ScoopFlavor[];
  toppings: string[];
  syrup?: string;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  image?: string;
  isCustom3D?: boolean;
  details?: CustomIceCream;
}

export interface BoardGame {
  id: string;
  title: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Fun';
  description: string;
  icon: string;
}

export interface AIFlavorResult {
  flavorName: string;
  description: string;
  scoopColors: string[];
  topping: string;
  pairing: string;
}

export interface Order {
  id: string;
  type: 'dine-in' | 'takeaway';
  customerName: string;
  customerPhone: string;
  tableNumber?: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMethod: 'Telebirr' | 'CBE Birr' | 'Cash';
  notes?: string;
  createdAt: string;
}

export interface TableStatus {
  id: string;
  tableName: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentGame?: string;
  playersCount?: number;
  startTime?: string;
  notes?: string;
}

export interface ShopSettings {
  name: string;
  englishName: string;
  announcement: string;
  phone: string;
  phoneDisplay: string;
  openingHours: string;
  address: string;
  rating: number;
  reviewCount: number;
  heroImage?: string;
  shopVibeImage?: string;
  googlePlusCode?: string;
}

