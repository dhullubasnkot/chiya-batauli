"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  image: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Fetch products (tea items)
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/items");
        const data = await res.json();

        // Fix: Accept both data.products and data as array
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setTotalProducts(data.products.length);
        } else if (Array.isArray(data)) {
          setProducts(data);
          setTotalProducts(data.length);
        } else {
          console.error("Invalid products data");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Card component
  const DashboardCard = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: number;
    color: string;
  }) => {
    const colorMap: Record<string, string> = {
      blue: "text-blue-600",
      red: "text-red-600",
      green: "text-green-600",
      yellow: "text-yellow-600",
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className={`text-4xl font-bold ${colorMap[color]}`}>{value}</p>
      </div>
    );
  };

  // Render the DashboardCard and any other UI
  return (
    <div className="p-8">
      <DashboardCard
        title="Total Products"
        value={totalProducts}
        color="blue"
      />
      {/* You can add more DashboardCard components for other stats */}
    </div>
  );
};

export default Dashboard;
