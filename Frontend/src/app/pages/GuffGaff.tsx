"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

type GuffGaffItem = {
  id: number;
  author: string;
  image: string;
  content: string;
};

type GuffGaffProps = {
  noSlice?: boolean;
  noNavbar?: boolean;
};

export default function GuffGaffMain({
  noSlice = true,
  noNavbar = true,
}: GuffGaffProps) {
  const [guffadi, setGuffadi] = useState<GuffGaffItem[]>([]);
  const [filteredGuffadi, setFilteredGuffadi] = useState<GuffGaffItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:4000/guffadi");
        if (!res.ok) throw new Error("Failed to fetch Guffadis Guff");
        const data = await res.json();

        const allGuffadi = data.map(
          (item: {
            id: number;
            author: string;
            image: string;
            content: string;
          }) => ({
            id: item.id,
            author: item.author,
            image: `http://localhost:4000/uploads${item.image}`,
            content: item.content,
          })
        );

        setGuffadi(allGuffadi);
        setFilteredGuffadi(allGuffadi);
        setError(null);
      } catch (err: unknown) {
        console.error("❌ Error fetching products:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const poemsToShow = noSlice ? filteredGuffadi.slice(0, 4) : filteredGuffadi;

  return (
    <>
      {!noNavbar && <Navbar />}
      <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-amber-700 mb-12 tracking-tight leading-tight">
            Chiya Batauli Guff Gaff
          </h1>

          {loading ? (
            <div className="text-center text-gray-600 text-lg py-10">
              Loading...
            </div>
          ) : error ? (
            <div className="text-center text-red-600 text-lg py-10">
              {error}
            </div>
          ) : poemsToShow.length === 0 ? (
            <div className="text-center text-gray-600 text-lg py-10">
              No guff gaff entries found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {poemsToShow.map((poem) => (
                <Link
                  key={poem.id}
                  href={`/guffgaff/author/${encodeURIComponent(poem.author)}`}
                  className="block"
                >
                  <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border border-gray-200">
                    <div className="flex items-center mb-6">
                      <Image
                        src={poem.image}
                        alt={poem.author}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-2 border-amber-400 shadow-sm"
                      />
                      <div className="ml-4">
                        <p className="font-bold text-lg text-amber-700">
                          {poem.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          Chiya Batauli Contributor
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed flex-grow">
                      {poem.content.split(" ").slice(0, 25).join(" ")}...
                    </p>
                    <div className="mt-4 text-right">
                      <span className="text-amber-600 font-medium hover:underline text-sm">
                        Read More &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
