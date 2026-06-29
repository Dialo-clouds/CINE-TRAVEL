"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Wine, Utensils, Cookie, Beef, Fish, Leaf, GlassWater } from "lucide-react";

const menus = {
  economy: {
    name: "Economy Class",
    meals: [
      { course: "Main", items: ["Grilled Chicken with Herbs", "Pasta Primavera", "Asian Rice Bowl"], icon: Utensils },
      { course: "Dessert", items: ["Chocolate Mousse", "Seasonal Fruit", "Ice Cream"], icon: Cookie },
      { course: "Beverages", items: ["Coffee", "Tea", "Soft Drinks", "Juice", "Water"], icon: Coffee },
    ]
  },
  business: {
    name: "Business Class",
    meals: [
      { course: "Starter", items: ["Smoked Salmon", "Caesar Salad", "Soup du Jour"], icon: Fish },
      { course: "Main", items: ["Filet Mignon", "Lobster Thermidor", "Rack of Lamb", "Vegetarian Risotto"], icon: Beef },
      { course: "Dessert", items: ["Tiramisu", "Crème Brûlée", "Cheese Plate"], icon: Cookie },
      { course: "Beverages", items: ["Champagne", "Premium Wines", "Craft Cocktails", "Espresso"], icon: Wine },
    ]
  },
  first: {
    name: "First Class",
    meals: [
      { course: "Amuse-Bouche", items: ["Caviar Service", "Truffle Canapés"], icon: Leaf },
      { course: "Starter", items: ["Lobster Bisque", "Foie Gras", "Tuna Tartare"], icon: Fish },
      { course: "Main", items: ["Wagyu Beef", "Turbot Meunière", "Truffle Pasta", "Chef's Tasting Menu"], icon: Beef },
      { course: "Dessert", items: ["Soufflé", "Petit Fours", "Artisan Cheese Selection"], icon: Cookie },
      { course: "Beverages", items: ["Dom Pérignon", "Château Margaux", "Single Malt Collection", "Artisan Coffee"], icon: Wine },
    ]
  }
};

export default function MenuPage() {
  const [selectedClass, setSelectedClass] = useState("business");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Culinary Experience</p>
            <h1 className="text-5xl font-light">In-Flight Menu</h1>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {Object.keys(menus).map(c => (
              <button key={c} onClick={() => setSelectedClass(c)} className={`px-5 py-2 rounded-full text-sm capitalize transition-colors ${selectedClass === c ? "bg-white text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                {menus[c as keyof typeof menus].name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {menus[selectedClass as keyof typeof menus].meals.map((meal, i) => (
              <motion.div key={meal.course} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <meal.icon className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-light">{meal.course}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {meal.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded-lg hover:bg-white/[0.02]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}