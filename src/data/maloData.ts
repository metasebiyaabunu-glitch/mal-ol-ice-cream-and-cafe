import { MenuItem, Review, ScoopFlavor, BoardGame, Order, TableStatus, ShopSettings } from '../types';

export const SHOP_INFO: ShopSettings = {
  name: 'ማልኦ',
  englishName: 'Mal-o Ice Cream & Cafe',
  announcement: 'Arba Minch\'s Premier Homemade Gelato & Board Game Cafe • Call: 092 228 1940',
  rating: 4.8,
  reviewCount: 16,
  address: 'Arbaminch Secha, 1st Floor (Next to Entrance), 2G4Q+RV4',
  phone: '092 228 1940',
  phoneDisplay: '+251 92 228 1940',
  openingHours: 'Mon - Sun: 9:00 AM - 9:30 PM',
  googlePlusCode: '2G4Q+RV4, Arba Minch',
  heroImage: '/src/assets/images/malo_hero_icecream_1784736241374.jpg',
  shopVibeImage: '/src/assets/images/malo_shop_vibe_1784736257290.jpg'
};

export const SCOOP_FLAVORS: ScoopFlavor[] = [
  {
    id: 'mango-banana',
    name: 'Mango Banana Special',
    amharicName: 'ማንጎ ባናና',
    color: '#FFB800',
    secondaryColor: '#FFE600',
    description: 'Fresh ripe Arba Minch mangoes blended with creamy local sweet bananas.',
    type: 'fruit',
    inStock: true
  },
  {
    id: 'chocolate-caramel',
    name: 'Rich Chocolate Caramel',
    amharicName: 'ቾኮሌት ካራሜል',
    color: '#4A2511',
    secondaryColor: '#D48B38',
    description: 'Decadent dark cocoa infused with homemade butter caramel swirls.',
    type: 'classic',
    inStock: true
  },
  {
    id: 'avocado-twist',
    name: 'Arba Minch Avocado Gelato',
    amharicName: 'አቮካዶ ጄላቶ',
    color: '#7DA042',
    secondaryColor: '#A4C639',
    description: 'Silky smooth local Ethiopian avocado gelato with a hint of honey and lime.',
    type: 'special',
    inStock: true
  },
  {
    id: 'ethiopian-coffee',
    name: 'Yirgacheffe Coffee Bean',
    amharicName: 'የኢትዮጵያ ቡና',
    color: '#6F4E37',
    secondaryColor: '#3B2219',
    description: 'Aromatic Ethiopian single-origin roast coffee gelato topped with espresso crush.',
    type: 'special',
    inStock: true
  },
  {
    id: 'passion-fruit',
    name: 'Tropical Passion Fruit',
    amharicName: 'ፓሽን ፍሩት',
    color: '#FF6B35',
    secondaryColor: '#FFA07A',
    description: 'Tangy and sweet natural tropical passion fruit sorbet, refreshing and light.',
    type: 'fruit',
    inStock: true
  },
  {
    id: 'strawberry-velvet',
    name: 'Fresh Strawberry Cream',
    amharicName: 'ስትሮቤሪ',
    color: '#FF4D6D',
    secondaryColor: '#FF758F',
    description: 'Creamy homemade gelato crafted with sweet handpicked strawberries.',
    type: 'classic',
    inStock: true
  },
  {
    id: 'vanilla-bean',
    name: 'Bourbon Vanilla Bean',
    amharicName: 'ቫኒላ',
    color: '#FFF3D1',
    secondaryColor: '#E6C687',
    description: 'Classic Madagascar vanilla gelato with real fragrant vanilla pod specks.',
    type: 'classic',
    inStock: true
  },
  {
    id: 'honey-sesame',
    name: 'Toasted Sesame & Honey',
    amharicName: 'ሰሊጥና ማር',
    color: '#D4A373',
    secondaryColor: '#FAEDCD',
    description: 'Nutty roasted local sesame with wild forest honey ribbon.',
    type: 'special',
    inStock: true
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Mango Banana Double Scoop',
    amharicName: 'ማንጎ ባናና አይስክሬም',
    category: 'icecream',
    price: 180,
    description: 'Mal-o signature homemade Mango Banana ice cream served in a freshly baked crispy waffle cone.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    popular: true,
    inStock: true,
    tags: ['Signature', 'Local Fruit', 'Must Try'],
    ingredients: ['Arba Minch Mango', 'Sweet Banana', 'Fresh Milk', 'Waffle Cone']
  },
  {
    id: 'm2',
    name: 'Chocolate Caramel Supreme',
    amharicName: 'ቾኮሌትና ካራሜል',
    category: 'icecream',
    price: 190,
    description: 'Double scoop of dark chocolate and rich butter caramel with crunchy roasted nut topping.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    popular: true,
    inStock: true,
    tags: ['Best Seller', 'Homemade Sauce'],
    ingredients: ['Dark Cocoa', 'Caramel Drizzle', 'Roasted Peanuts']
  },
  {
    id: 'm3',
    name: 'Arba Minch Special Avocado Burger',
    amharicName: 'አቮካዶ በርገር',
    category: 'snacks',
    price: 280,
    description: 'Gourmet homemade burger topped with thick slices of fresh local avocado, lettuce, tomatoes, and house sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    popular: true,
    inStock: true,
    tags: ['Snack Highlight', 'Fresh Avocado'],
    ingredients: ['Fresh Bun', 'Local Avocado', 'Crispy Patty', 'Secret Mal-o Sauce']
  },
  {
    id: 'm4',
    name: 'Crispy Seasoned French Fries',
    amharicName: 'ቺፕስ',
    category: 'snacks',
    price: 150,
    description: 'Golden potato fries seasoned with herb spice salt, served hot with chili dip and ketchup.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    inStock: true,
    tags: ['Crispy', 'Snack favorite'],
    ingredients: ['Fresh Potato', 'Herbal Salt', 'Dipping Sauce']
  },
  {
    id: 'm5',
    name: 'Traditional Ethiopian Macchiato',
    amharicName: 'ማኪያቶ',
    category: 'drinks',
    price: 90,
    description: 'Rich freshly brewed Ethiopian roast coffee layered with velvety steamed milk foam.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    popular: true,
    inStock: true,
    tags: ['Fresh Brew', 'Coffee Lover'],
    ingredients: ['Single Origin Coffee', 'Steamed Milk']
  },
  {
    id: 'm6',
    name: 'Iced Passionfruit Fresh Juice',
    amharicName: 'የፓሽን ጁስ',
    category: 'drinks',
    price: 120,
    description: '100% natural cold pressed passionfruit juice served over crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    inStock: true,
    tags: ['100% Juice', 'Refreshing'],
    ingredients: ['Fresh Passionfruit', 'Ice', 'Mint Leaf']
  },
  {
    id: 'm7',
    name: 'Ethiopian Coffee Gelato Sundae',
    amharicName: 'የቡና ጄላቶ ሳንዴ',
    category: 'desserts',
    price: 240,
    description: 'Coffee gelato scoops topped with chocolate fudge, whipped cream, and roasted coffee bean crunch.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    inStock: true,
    tags: ['Special Dessert', 'Indulgent'],
    ingredients: ['Coffee Gelato', 'Fudge Sauce', 'Whipped Cream']
  },
  {
    id: 'm8',
    name: 'Waffle Bowl Berry Delight',
    amharicName: 'ዋፍል ቦውል አይስክሬም',
    category: 'desserts',
    price: 260,
    description: 'Crispy cinnamon waffle bowl filled with vanilla & strawberry gelato, fresh fruits, and honey.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    inStock: true,
    tags: ['Waffle Bowl', 'Sharing Size'],
    ingredients: ['Vanilla Gelato', 'Strawberry Gelato', 'Waffle Bowl', 'Honey']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'sophia sileshi',
    role: 'Local Visitor',
    rating: 5,
    timeAgo: '7 months ago',
    comment: 'The place is on the first floor of the building next to the entrance in the photo I posted. I had the chocolate and caramel ice cream it was really good. The place itself is very nice and perfect for hanging out with friends!',
    photos: [
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 4
  },
  {
    id: 'r2',
    author: 'Jan van Beek',
    role: 'Local Guide • 58 reviews',
    rating: 5,
    timeAgo: '3 years ago',
    comment: 'Here you can buy good icecreams of different flavours. They make the ice themselves and try to create new ones. Also they have some snacks. Besides that is it a nice place to be. With the possibility of playing board games!',
    likes: 6
  },
  {
    id: 'r3',
    author: 'Jos de Wit',
    role: 'Local Guide • 44 reviews',
    rating: 5,
    timeAgo: '3 years ago',
    comment: 'Very nice ice cream shop with locally produced ice-cream with local ingredients. They have a large variety of flavours and new flavours are still being added to the menu. They also have good coffee and snacks such as fries, avocado burger … More',
    likes: 3
  }
];

export const BOARD_GAMES: BoardGame[] = [
  {
    id: 'g1',
    title: 'Chess & Gebeta (Mancala)',
    players: '2 Players',
    difficulty: 'Medium',
    description: 'Classic strategic challenge! Enjoy traditional Gebeta or Chess with friends while savoring gelato.',
    icon: 'Crown'
  },
  {
    id: 'g2',
    title: 'Scrabble & Word Masters',
    players: '2-4 Players',
    difficulty: 'Fun',
    description: 'Test your vocabulary skills over a hot Ethiopian Macchiato and fries.',
    icon: 'Sparkles'
  },
  {
    id: 'g3',
    title: 'Jenga & Connect 4',
    players: '2+ Players',
    difficulty: 'Easy',
    description: 'Fast-paced, suspenseful stack building games perfect for group laughs.',
    icon: 'Boxes'
  },
  {
    id: 'g4',
    title: 'Ludo & Monopoly',
    players: '2-6 Players',
    difficulty: 'Fun',
    description: 'Roll the dice, race your tokens, and build your board empire at Mal-o lounge.',
    icon: 'Dices'
  }
];

export const INITIAL_TABLES: TableStatus[] = [
  { id: 't1', tableName: 'Table 1 (Window Side)', capacity: 4, status: 'occupied', currentGame: 'Scrabble & Word Masters', playersCount: 3, startTime: '12:15 PM' },
  { id: 't2', tableName: 'Table 2 (Gelato Bar)', capacity: 2, status: 'available' },
  { id: 't3', tableName: 'Table 3 (Central Lounge)', capacity: 6, status: 'occupied', currentGame: 'Ludo & Monopoly', playersCount: 4, startTime: '12:40 PM' },
  { id: 't4', tableName: 'Table 4 (VIP Corner)', capacity: 6, status: 'reserved', notes: 'Reserved for 2:30 PM birthday group' },
  { id: 't5', tableName: 'Table 5 (1st Floor Balcony)', capacity: 4, status: 'available' },
  { id: 't6', tableName: 'Table 6 (Quiet Study Nook)', capacity: 2, status: 'available' },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MALO-1024',
    type: 'dine-in',
    customerName: 'Abebe Bikila',
    customerPhone: '0911223344',
    tableNumber: 'Table 1',
    items: [
      { id: 'm1', title: 'Mango Banana Double Scoop', price: 180, quantity: 2 },
      { id: 'm5', title: 'Traditional Ethiopian Macchiato', price: 90, quantity: 2 }
    ],
    totalAmount: 540,
    status: 'preparing',
    paymentMethod: 'Telebirr',
    notes: 'Extra crispy waffle cone please!',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString()
  },
  {
    id: 'MALO-1025',
    type: 'takeaway',
    customerName: 'Tigist Haile',
    customerPhone: '0922884411',
    items: [
      { id: 'm3', title: 'Arba Minch Special Avocado Burger', price: 280, quantity: 1 },
      { id: 'm4', title: 'Crispy Seasoned French Fries', price: 150, quantity: 1 },
      { id: 'm6', title: 'Iced Passionfruit Fresh Juice', price: 120, quantity: 1 }
    ],
    totalAmount: 550,
    status: 'pending',
    paymentMethod: 'CBE Birr',
    notes: 'Please pack chili dip separately.',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    id: 'MALO-1022',
    type: 'dine-in',
    customerName: 'Dawit Yohannes',
    customerPhone: '0944556677',
    tableNumber: 'Table 3',
    items: [
      { id: 'm7', title: 'Ethiopian Coffee Gelato Sundae', price: 240, quantity: 2 },
      { id: 'm4', title: 'Crispy Seasoned French Fries', price: 150, quantity: 2 }
    ],
    totalAmount: 780,
    status: 'ready',
    paymentMethod: 'Cash',
    createdAt: new Date(Date.now() - 28 * 60000).toISOString()
  }
];

