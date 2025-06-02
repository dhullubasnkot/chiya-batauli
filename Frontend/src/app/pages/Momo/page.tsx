"use client";
import Footer from "@/app/components/footer";
import Template from "@/app/components/ItemsTemplate/template";
import Navbar from "@/app/components/navbar";
import { useState, useEffect } from "react";
export default function Momo() {
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
    <>
      <Navbar />
      <Template
        items={products}
        title="Best Momo in Town"
        title1="A collection of everyone's favorite Momo"
        noslice={false}
        taste="/items/momo"
        buttonText="More Momo"
      />
      <Footer />
    </>
  );
}
