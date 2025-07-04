"use client";
import Template from "../components/ItemsTemplate/template";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number; // Add price property to match Item type
  // Add more specific properties here if needed, or remove the index signature entirely
};

export default function BestChiyaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setError] = useState<string | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        const momoItems = data
          .filter((item: Product) => item.category === "Tea")
          .map((item: Product) => ({
            ...item,
            image: `http://localhost:4000/uploads${item.image}`,
            price: item.price ?? 0, // Ensure price is present; default to 0 if missing
          }));

        setProducts(momoItems);
        setError(null);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Template
      title="Best Sip of Chiya"
      title1="A collection of everyone's favorite tea"
      items={products}
      noslice={true}
      taste="/pages/Chiya"
      buttonText="More Taste"
    />
  );
}
