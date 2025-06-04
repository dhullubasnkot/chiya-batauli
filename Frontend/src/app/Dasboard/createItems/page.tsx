"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("❌ Please log in to add a product.");
      router.push("/pages/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const category = formData.get("category")?.toString() || "default";

    try {
      const response = await fetch(
        `http://localhost:4000/items?uploadDirectory=${category}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create item");
      }

      const data = await response.json();
      alert(`✅ Item created successfully: ${data.name}`);
      router.push("/");
    } catch (error: unknown) {
      console.error("❌ Error creating item:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Create Product</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            step="0.01"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            required
            className="w-full border p-2 rounded"
          />
          <input type="checkbox" name="isAvailable" className="mr-2" />
          <label htmlFor="isAvailable">Available</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
