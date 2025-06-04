"use client";
import Footer from "@/app/components/footer";
import Template from "@/app/components/ItemsTemplate/template";
import Navbar from "@/app/components/navbar";
import { useState, useEffect } from "react";

// Define the Item type if not already defined elsewhere
type Item = {
  id: number;
  name: string;
  category: string;
  image: string;
  // Add other fields as needed
};

export default function Roti() {
  const [products, setProducts] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: Item[]) => {
        // ✅ Filter Momo items and attach uploads path
        const momoItems = data
          .filter((item: Item) => item.category === "Roti")
          .map((item: Item) => ({
            ...item,
            image: `http://localhost:4000/uploads${item.image}`,
          }));

        setProducts(momoItems);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Navbar />
      <Template
        items={products}
        title="Best Roti in Town"
        title1="A collection of everyone's favorite Roti"
        noslice={false}
        taste="/items/Roti"
        buttonText="More Roti"
      />
      <Footer />
    </>
  );
}
