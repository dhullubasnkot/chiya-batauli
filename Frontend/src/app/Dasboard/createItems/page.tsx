"use client";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

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
    <div className="w-full h-full  p-8 mb-10">
      {" "}
      <div className="w-full mb-10 ">
        {" "}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Create New Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-7"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Artisan Crafted Wooden Bowl"
              required
              className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 49.99"
              step="0.01"
              required
              className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the product, its features, and benefits."
              required
              rows={6}
              className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 resize-y"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="e.g., Home Decor, Electronics, Books"
              required
              className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Ingredients / Materials
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              placeholder="e.g., Wood, Metal, Cotton (comma separated)"
              required
              className="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isAvailable"
              className="ml-3 block text-base text-gray-900"
            >
              Mark as Available for Sale
            </label>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="w-full text-gray-700 border border-gray-300 p-4 rounded-lg bg-white file:hidden file:text-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              Upload a high-quality image of your product (JPG, PNG, GIF).
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-4 rounded-lg text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
