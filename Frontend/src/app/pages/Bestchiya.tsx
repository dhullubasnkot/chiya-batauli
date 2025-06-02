"use client";
import Template from "../components/ItemsTemplate/template";
import { useState, useEffect } from "react";

export default function BestChiyaPage() {
  const [products, setProducts] = useState([]);
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
      .then((data) => {
        // ✅ Filter Momo items and attach uploads path
        const momoItems = data
          .filter((item: any) => item.category === "Tea")
          .map((item: any) => ({
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
