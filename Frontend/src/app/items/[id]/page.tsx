import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  image: string;
  ingredients: string[];
  category: string;
}

export default async function ItemDetails({
  params,
}: {
  params: { id: string };
}) {
  // 1. Fetch the current item
  const res = await fetch(`http://localhost:4000/items/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const rawItem = await res.json();

  let ingredients: string[] = [];
  try {
    ingredients = JSON.parse(rawItem.ingredients);
  } catch {
    ingredients = [];
  }

  const item: Item = {
    ...rawItem,
    ingredients,
    isAvailable: Boolean(rawItem.isAvailable),
    price: Number(rawItem.price),
  };

  // 2. Fetch all items to filter similar ones
  const allItemsRes = await fetch("http://localhost:4000/items", {
    cache: "no-store",
  });
  const allRawItems: Item[] = await allItemsRes.json();

  const similarItems = allRawItems
    .filter((other) => other.category === item.category && other.id !== item.id)
    .map((similar) => ({
      ...similar,
      price: Number(similar.price),
    }));

  const imagePath = item.image.startsWith("/") ? item.image : `/${item.image}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-16">
        {/* Item Info */}
        <section className="w-full mb-10">
          <div className="grid md:grid-cols-2 gap-10 px-4 sm:px-6 md:px-10 py-10 border-t border-amber-100 animate-fade-in">
            {/* Image Section */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={`http://localhost:4000/uploads${imagePath}`}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Text Info */}
            <div className="space-y-6 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-amber-800">{item.name}</h1>
              <p>{item.description}</p>
              <p className="text-2xl font-bold text-amber-600">
                Rs. {item.price}
              </p>
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    item.isAvailable ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-amber-700">
                  Ingredients:
                </h2>
                <ul className="list-disc list-inside">
                  {item.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Items */}
        {similarItems.length > 0 && (
          <section className="w-full py-12 px-4 sm:px-6 md:px-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-800 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarItems.map((similar) => (
                <Link
                  href={`/items/${similar.id}`}
                  key={similar.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden border border-amber-50 flex flex-col"
                >
                  <div className="relative w-full h-32 md:h-40">
                    <Image
                      src={`http://localhost:4000/uploads${similar.image}`}
                      alt={similar.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-3 flex flex-col justify-between">
                    <h3 className="text-sm md:text-lg font-semibold text-amber-800">
                      {similar.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {similar.description}
                    </p>
                    <p className="text-sm text-amber-700 font-bold mt-1">
                      Rs. {similar.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
