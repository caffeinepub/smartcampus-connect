import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, MessageCircle, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Hardware" | "Software" | "Books" | "Dev Boards";
type ListingType = "Sell" | "Rent";

interface Product {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  type: ListingType;
  price: string;
  seller: string;
  rating: number;
  reviews: number;
  description: string;
  emoji: string;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Arduino Mega 2560",
    category: "Dev Boards",
    type: "Sell",
    price: "₹1,200",
    seller: "Arjun M.",
    rating: 4.8,
    reviews: 12,
    description: "Barely used, all pins working. Comes with USB cable.",
    emoji: "🔌",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    title: "Raspberry Pi 4 (4GB)",
    category: "Dev Boards",
    type: "Rent",
    price: "₹150/day",
    seller: "Priya N.",
    rating: 4.9,
    reviews: 8,
    description: "Perfect condition with power adapter and case.",
    emoji: "🍓",
    color: "from-red-400 to-pink-500",
  },
  {
    id: 3,
    title: "GATE CSE 2026 Books Set",
    category: "Books",
    type: "Sell",
    price: "₹800",
    seller: "Rahul S.",
    rating: 4.5,
    reviews: 23,
    description: "Complete set of 6 books, minimal highlighting.",
    emoji: "📚",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Oscilloscope (100MHz)",
    category: "Hardware",
    type: "Rent",
    price: "₹200/day",
    seller: "Vikram R.",
    rating: 4.7,
    reviews: 6,
    description: "Professional grade, calibrated. Ideal for lab work.",
    emoji: "📡",
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: 5,
    title: "JetBrains All Products Pack",
    category: "Software",
    type: "Sell",
    price: "₹500",
    seller: "Sneha P.",
    rating: 4.6,
    reviews: 15,
    description: "1-year student license transfer. All IDEs included.",
    emoji: "💻",
    color: "from-purple-400 to-violet-500",
  },
  {
    id: 6,
    title: "Data Structures Textbook",
    category: "Books",
    type: "Sell",
    price: "₹350",
    seller: "Ananya K.",
    rating: 4.4,
    reviews: 31,
    description: "Cormen CLRS 3rd edition. Good condition.",
    emoji: "📖",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 7,
    title: "ESP32 Development Kit",
    category: "Dev Boards",
    type: "Sell",
    price: "₹450",
    seller: "Karthik I.",
    rating: 4.9,
    reviews: 9,
    description: "WiFi + Bluetooth enabled. Includes breadboard.",
    emoji: "📶",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 8,
    title: "Soldering Station Kit",
    category: "Hardware",
    type: "Rent",
    price: "₹100/day",
    seller: "Divya M.",
    rating: 4.3,
    reviews: 18,
    description: "Temperature controlled. All accessories included.",
    emoji: "🔧",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 9,
    title: "Machine Learning Course Notes",
    category: "Books",
    type: "Sell",
    price: "₹200",
    seller: "Arjun M.",
    rating: 4.7,
    reviews: 44,
    description: "Handwritten + printed notes for Andrew Ng course.",
    emoji: "🤖",
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: 10,
    title: "FPGA Xilinx Artix-7",
    category: "Dev Boards",
    type: "Rent",
    price: "₹300/day",
    seller: "Vikram R.",
    rating: 4.8,
    reviews: 5,
    description: "High-end FPGA board for digital design projects.",
    emoji: "🔲",
    color: "from-slate-400 to-gray-600",
  },
];

const categories: Category[] = [
  "All",
  "Hardware",
  "Software",
  "Books",
  "Dev Boards",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function SustainableMarketplace() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-pattern-lines">
        <div
          style={{
            background:
              "linear-gradient(135deg, #7f1d1d 0%, #991b1b 35%, #dc2626 65%, #ef4444 100%)",
          }}
          className="absolute inset-0"
        />
        <img
          src="/assets/generated/hero-bg.dim_1920x400.png"
          alt=""
          className="w-full h-40 object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div>
            <img
              src="/assets/generated/nirgrantha-logo-transparent.dim_400x80.png"
              alt="NIRGRANTHA"
              className="nirgrantha-section-logo mb-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Sustainable Marketplace
            </h1>
            <p className="text-white/80 text-sm">
              Buy, sell, or rent tech resources within your campus community
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              {products.length} listings
            </span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${
                activeCategory === cat
                  ? "bg-teal text-white shadow-teal"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }
            `}
          >
            {cat}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          {filtered.length} items
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <Card
            key={product.id}
            className="rounded-2xl shadow-card card-hover overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fecdd3 100%)",
              borderLeft: "4px solid #e11d48",
            }}
          >
            {/* Product Image Placeholder */}
            <div
              className={`h-36 bg-gradient-to-br ${product.color} flex items-center justify-center relative`}
            >
              <span className="text-5xl">{product.emoji}</span>
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${product.type === "Sell" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}
                >
                  {product.type}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/30 text-white backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1 leading-snug">
                {product.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold text-teal">
                  {product.price}
                </span>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={product.rating} />
                  <span className="text-[10px] text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal to-emerald flex items-center justify-center text-white text-[9px] font-bold">
                    {product.seller[0]}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.seller}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full h-8 text-xs rounded-lg bg-teal hover:bg-teal/90 text-white flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat with Seller
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
