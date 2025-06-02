"use client";
import Template from "../components/ItemsTemplate/template";
import { useEffect, useState } from "react";

export default function BestNastaPage() {
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
          .filter((item: any) => item.category === "Momo")
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
      title="Craving Something Light? Try These!"
      title1="Perfect Picks for Your Snack Time"
      items={products}
      noslice={true}
      taste="/pages/Momo"
      buttonText="More Nasta"
    />
  );
}
