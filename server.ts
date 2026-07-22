import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { INITIAL_ORDERS, INITIAL_TABLES, MENU_ITEMS, SCOOP_FLAVORS, SHOP_INFO } from "./src/data/maloData";
import { Order, MenuItem, ScoopFlavor, TableStatus, ShopSettings } from "./src/types";

dotenv.config();

// In-memory data store for live restaurant management
let liveOrders: Order[] = [...INITIAL_ORDERS];
let liveMenuItems: MenuItem[] = [...MENU_ITEMS];
let liveScoopFlavors: ScoopFlavor[] = [...SCOOP_FLAVORS];
let liveTables: TableStatus[] = [...INITIAL_TABLES];
let liveSettings: ShopSettings = { ...SHOP_INFO };

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", shop: "ማልኦ (Mal-o) Ice Cream & Cafe" });
  });

  // RESTAURANT BACKSIDE MANAGEMENT APIs

  // --- 1. Orders Management ---
  app.get("/api/admin/orders", (_req, res) => {
    res.json(liveOrders);
  });

  app.post("/api/admin/orders", (req, res) => {
    const { type, customerName, customerPhone, tableNumber, items, totalAmount, paymentMethod, notes } = req.body;
    
    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({ error: "Customer name and order items are required" });
    }

    const newOrder: Order = {
      id: `MALO-${Math.floor(1000 + Math.random() * 9000)}`,
      type: type || "dine-in",
      customerName,
      customerPhone: customerPhone || "N/A",
      tableNumber: tableNumber || (type === "dine-in" ? "Table 1" : undefined),
      items,
      totalAmount: totalAmount || items.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0),
      status: "pending",
      paymentMethod: paymentMethod || "Telebirr",
      notes: notes || "",
      createdAt: new Date().toISOString()
    };

    liveOrders.unshift(newOrder);
    res.status(201).json(newOrder);
  });

  app.patch("/api/admin/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status, paymentMethod } = req.body;

    const order = liveOrders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status) order.status = status;
    if (paymentMethod) order.paymentMethod = paymentMethod;

    res.json(order);
  });

  app.delete("/api/admin/orders/:id", (req, res) => {
    const { id } = req.params;
    liveOrders = liveOrders.filter((o) => o.id !== id);
    res.json({ success: true, message: `Order ${id} deleted` });
  });

  // --- 2. Menu Items Management ---
  app.get("/api/admin/menu", (_req, res) => {
    res.json(liveMenuItems);
  });

  app.post("/api/admin/menu", (req, res) => {
    const { name, amharicName, category, price, description, image, tags, ingredients } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    const newItem: MenuItem = {
      id: `m_${Date.now()}`,
      name,
      amharicName: amharicName || name,
      category,
      price: Number(price),
      description: description || "",
      image: image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      inStock: true,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((t: string) => t.trim()) : ["Fresh"]),
      ingredients: Array.isArray(ingredients) ? ingredients : []
    };

    liveMenuItems.push(newItem);
    res.status(201).json(newItem);
  });

  app.put("/api/admin/menu/:id", (req, res) => {
    const { id } = req.params;
    const index = liveMenuItems.findIndex((m) => m.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    liveMenuItems[index] = { ...liveMenuItems[index], ...req.body };
    res.json(liveMenuItems[index]);
  });

  app.patch("/api/admin/menu/:id/toggle-stock", (req, res) => {
    const { id } = req.params;
    const item = liveMenuItems.find((m) => m.id === id);
    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    item.inStock = !item.inStock;
    res.json(item);
  });

  app.delete("/api/admin/menu/:id", (req, res) => {
    const { id } = req.params;
    liveMenuItems = liveMenuItems.filter((m) => m.id !== id);
    res.json({ success: true, message: "Item deleted" });
  });

  // --- 3. Gelato Scoop Flavors Management ---
  app.get("/api/admin/scoops", (_req, res) => {
    res.json(liveScoopFlavors);
  });

  app.put("/api/admin/scoops/:id", (req, res) => {
    const { id } = req.params;
    const index = liveScoopFlavors.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Scoop flavor not found" });
    }

    liveScoopFlavors[index] = { ...liveScoopFlavors[index], ...req.body };
    res.json(liveScoopFlavors[index]);
  });

  // --- 4. Board Game Lounge Tables Management ---
  app.get("/api/admin/tables", (_req, res) => {
    res.json(liveTables);
  });

  app.patch("/api/admin/tables/:id", (req, res) => {
    const { id } = req.params;
    const table = liveTables.find((t) => t.id === id);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    const { status, currentGame, playersCount, notes } = req.body;
    if (status) table.status = status;
    if (currentGame !== undefined) table.currentGame = currentGame;
    if (playersCount !== undefined) table.playersCount = playersCount;
    if (notes !== undefined) table.notes = notes;
    if (status === "occupied" && !table.startTime) {
      table.startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (status === "available") {
      table.startTime = undefined;
      table.currentGame = undefined;
      table.playersCount = undefined;
    }

    res.json(table);
  });

  // --- 5. Shop Settings Management ---
  app.get("/api/admin/settings", (_req, res) => {
    res.json(liveSettings);
  });

  app.put("/api/admin/settings", (req, res) => {
    liveSettings = { ...liveSettings, ...req.body };
    res.json(liveSettings);
  });

  // --- 6. Analytics & Financial Summary ---
  app.get("/api/admin/analytics", (_req, res) => {
    const totalOrders = liveOrders.length;
    const completedOrders = liveOrders.filter((o) => o.status === "completed" || o.status === "ready" || o.status === "preparing");
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    
    const telebirrCount = liveOrders.filter((o) => o.paymentMethod === "Telebirr").length;
    const cbeCount = liveOrders.filter((o) => o.paymentMethod === "CBE Birr").length;
    const cashCount = liveOrders.filter((o) => o.paymentMethod === "Cash").length;

    res.json({
      totalOrders,
      activeOrdersCount: liveOrders.filter((o) => o.status === "pending" || o.status === "preparing").length,
      totalRevenueETB: totalRevenue,
      avgOrderValueETB: avgOrderValue,
      paymentBreakdown: {
        telebirr: telebirrCount,
        cbe: cbeCount,
        cash: cashCount
      },
      menuCount: liveMenuItems.length,
      tablesOccupied: liveTables.filter((t) => t.status === "occupied").length,
      tablesTotal: liveTables.length
    });
  });

  // AI Ice Cream Flavor Generator & Recommender

  app.post("/api/recommend-flavor", async (req, res) => {
    try {
      const { mood, preference, dietary, occasion } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          flavorName: "Mango Banana Special (ማልኦ Signature)",
          description: "Our signature blend of ripe Ethiopian mangoes and local Arba Minch bananas with a creamy homemade twist!",
          scoopColors: ["#FFA500", "#FFD700"],
          topping: "Fresh Mango Slices & Toasted Coconut",
          pairing: "Iced Ethiopian Black Coffee"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the master gelato artisan at "ማልኦ (Mal-o) Ice Cream & Cafe" in Arba Minch, Ethiopia.
Create a unique, delicious homemade ice cream flavor concept based on the user's input:
- Mood/Vibe: ${mood || "Happy"}
- Flavor Preferences: ${preference || "Fruity & Creamy"}
- Dietary preference: ${dietary || "None"}
- Occasion: ${occasion || "Casual hangout"}

Format your output strictly as a valid JSON object with the following keys:
{
  "flavorName": "Creative name with Ethiopian touch",
  "description": "Appetizing description highlighting local Ethiopian ingredients (like Arba Minch mangoes, bananas, avocados, honey, Ethiopian coffee, roasted sesame)",
  "scoopColors": ["#hex1", "#hex2"],
  "topping": "Unique topping suggestion",
  "pairing": "Suggested drink or snack from Mal-o cafe"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (error) {
      console.error("AI flavor error:", error);
      res.json({
        flavorName: "Avocado Honey Twist (ማልኦ Special)",
        description: "Fresh Arba Minch buttery avocados blended into rich gelato with wild mountain honey and toasted nuts.",
        scoopColors: ["#88B04B", "#D4AF37"],
        topping: "Honey drizzle & Roasted almonds",
        pairing: "Spiced Ethiopian Macchiato"
      });
    }
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
