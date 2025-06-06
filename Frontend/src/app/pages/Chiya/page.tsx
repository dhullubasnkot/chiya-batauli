"use client";
import Footer from "@/app/components/footer";
import Template from "@/app/components/ItemsTemplate/template";
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number; // Add price property
  [key: string]: unknown;
};

export default function Chiya() {
  const [products, setProducts] = useState<Product[]>([]);
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
      .then((data: Product[]) => {
        const momoItems = data
          .filter((item: Product) => item.category === "Tea")
          .map((item: Product) => ({
            ...item,
            image: `http://localhost:4000/uploads${item.image}`,
            price: typeof item.price === "number" ? item.price : 0, // Ensure price exists
          }));

        setProducts(momoItems as Product[]);
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
    <>
      <Navbar />
      <Template
        title="Best Sip of Chiya"
        title1="A collection of everyone's favorite tea"
        items={products}
        noslice={false}
        taste="/items/tea"
        buttonText="More Taste"
      />
      <Footer />
    </>
  );
}
