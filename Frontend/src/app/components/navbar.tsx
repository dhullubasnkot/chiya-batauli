"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronDown as ChevronDown,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

// import HotelItems from "../data/hoteldata";

export default function Navbar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    ingredients: string[];
    description: string;
    isAvailable?: boolean;
  };
  const [menu, setMenu] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<
    "menu" | "guffgaff" | null
  >(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [mobileDropdown, setMobileDropdown] = useState<null | string>(null);
  const [filteredHotels, setFilteredHotels] = useState<Product[] | undefined>(
    undefined
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Fetch items from API
  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:4000/items");
      if (!res.ok) throw new Error("Failed to fetch Menu");
      const data = await res.json();

      const allItems = data.map((item: any) => ({
        ...item,
        image: `http://localhost:4000/uploads${item.image}`,
      }));

      setMenu(allItems);
      setFilteredHotels(allItems);
      setError(null);
    } catch (err: unknown) {
      console.error("❌ Error fetching menu:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    // if (query.trim() === "") {
    //   setFilteredHotels(menu);
    //   return;
    // }

    // const results = menu.filter(
    //   (item) =>
    //     item.name.toLowerCase().includes(query) ||
    //     item.category.toLowerCase().includes(query) ||
    //     (item.ingredients || []).some((i: string) =>
    //       i.toLowerCase().includes(query)
    //     )
    // );

    // setFilteredHotels(results);
    fetchItems();
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/chiya.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full shadow-sm"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium pr-28">
          <Link
            href="/"
            className="hover:text-amber-600 transition-colors duration-300"
          >
            Home
          </Link>

          <div className="relative w-[350px] hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-full pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch
              size={16}
              className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            />
            {searchQuery && filteredHotels && filteredHotels.length > 0 && (
              <ul className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md w-full mt-1 z-50 max-h-64 overflow-y-auto">
                {(filteredHotels as Product[]).map((menu: Product) => (
                  <li
                    key={menu.id}
                    className="p-3 text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Link
                      href={`/items/${menu.id}`}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={menu.image}
                        alt={menu.name}
                        width={40}
                        height={40}
                        className="rounded-md shadow-md object-cover"
                      />
                      <span>{menu.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() =>
                setDesktopDropdown(desktopDropdown === "menu" ? null : "menu")
              }
              className="flex items-center gap-1 hover:text-amber-600 transition-colors duration-300 focus:outline-none"
            >
              Menu <ChevronDown size={18} className="mt-0.5" />
            </button>

            <AnimatePresence>
              {desktopDropdown === "menu" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50 py-2"
                >
                  <li className="group relative">
                    <Link href="/pages/Chiya">
                      <span className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200">
                        Chiya
                      </span>
                    </Link>
                  </li>

                  <li className="group relative">
                    <Link href="/eheki">
                      <span className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200">
                        Nasta{" "}
                        <ChevronDown
                          size={16}
                          className="rotate-90 group-hover:rotate-180 transition-transform duration-200"
                        />
                      </span>
                    </Link>
                    <ul className="absolute top-0 left-full ml-1 w-48 bg-white shadow-lg rounded-lg border border-gray-100 hidden group-hover:block transition-all duration-300 ease-in-out py-1">
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/pages/Momo">Momo</Link>
                      </li>
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/pages/Chatpate">Chatpate</Link>
                      </li>
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/pages/Roti">Roti</Link>
                      </li>
                    </ul>
                  </li>

                  <li className="group relative">
                    <span className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200">
                      Cold Drinks{" "}
                      <ChevronDown
                        size={16}
                        className="rotate-90 group-hover:rotate-180 transition-transform duration-200"
                      />
                    </span>
                    <ul className="absolute top-0 left-full ml-1 w-48 bg-white shadow-lg rounded-lg border border-gray-100 hidden group-hover:block transition-all duration-300 ease-in-out py-1">
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/menu/coca-cola">Coca-Cola</Link>
                      </li>
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/menu/sprite">Sprite</Link>
                      </li>
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/menu/frooti">Frooti</Link>
                      </li>
                    </ul>
                  </li>
                  {/* smokes zone */}
                  <li className="group relative">
                    <span className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200">
                      Smokes{" "}
                      <ChevronDown
                        size={16}
                        className="rotate-90 group-hover:rotate-180 transition-transform duration-200"
                      />
                    </span>
                    <ul className="absolute top-0 left-full ml-1 w-48 bg-white shadow-lg rounded-lg border border-gray-100 hidden group-hover:block transition-all duration-300 ease-in-out py-1">
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/menu/hukka">Hukka</Link>
                      </li>
                      <li className="p-3 hover:bg-gray-50 text-gray-700 hover:text-amber-600 transition-colors duration-200">
                        <Link href="/menu/cigarette">Cigarette</Link>
                      </li>
                    </ul>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/pages/Gallery"
            className="hover:text-amber-600 transition-colors duration-300"
          >
            Gallery
          </Link>
          <div className="relative">
            <button
              onClick={() =>
                setDesktopDropdown(
                  desktopDropdown === "guffgaff" ? null : "guffgaff"
                )
              }
              className="flex items-center gap-1 hover:text-amber-600 transition-colors duration-300 focus:outline-none"
            >
              Guff Gaff <ChevronDown size={18} className="mt-0.5" />
            </button>
            <AnimatePresence>
              {desktopDropdown === "guffgaff" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 w-48 bg-white shadow-xl rounded-lg border border-gray-100 z-50 py-2"
                >
                  <li>
                    <Link
                      href="/pages/GuffGafnew"
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200"
                    >
                      Kura Haru
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shareguff"
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-800 hover:text-amber-600 transition-colors duration-200"
                    >
                      Kurauteee
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4">
          <div className="flex flex-col space-y-2 text-gray-800 font-medium">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-amber-600"
            >
              Home
            </Link>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border rounded-full pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
              <FiSearch
                className="absolute left-3 top-3 text-gray-500"
                size={16}
              />
              {searchQuery && filteredHotels && filteredHotels.length > 0 && (
                <ul className="absolute bg-white shadow-md rounded-md w-full mt-1 z-50 max-h-64 overflow-y-auto">
                  {filteredHotels.map((chiya) => (
                    <li key={chiya.id} className="p-3 hover:bg-gray-200">
                      <Link
                        href={`/items/${chiya.id}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={chiya.image}
                            alt={chiya.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <span>{chiya.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/pages/Chiya"
              onClick={() => setMobileOpen(false)}
              className="hover:text-amber-600"
            >
              Chiya
            </Link>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-amber-600"
            >
              Nasta
            </Link>
            <div className=" flex flex-col ml-4 space-y-1 text-sm">
              <Link href="/pages/Momo" onClick={() => setMobileOpen(false)}>
                Momo
              </Link>
              <Link href="/pages/Chatpate" onClick={() => setMobileOpen(false)}>
                Chatpate
              </Link>
              <Link href="/pages/Roti" onClick={() => setMobileOpen(false)}>
                Roti
              </Link>
            </div>

            <span className="text-gray-600 font-semibold">Cold Drinks</span>
            <div className=" flex flex-col ml-4 space-y-1 text-sm">
              <Link href="/menu/coca-cola" onClick={() => setMobileOpen(false)}>
                Coca-Cola
              </Link>
              <Link href="/menu/sprite" onClick={() => setMobileOpen(false)}>
                Sprite
              </Link>
              <Link href="/menu/frooti" onClick={() => setMobileOpen(false)}>
                Frooti
              </Link>
            </div>

            <span className="text-gray-600 font-semibold">Smokes</span>
            <div className="ml-4 space-y-1 text-sm">
              <Link href="/menu/hukka" onClick={() => setMobileOpen(false)}>
                Hukka
              </Link>
              <Link href="/menu/cigarette" onClick={() => setMobileOpen(false)}>
                Cigarette
              </Link>
            </div>

            <Link
              href="/pages/Gallery"
              onClick={() => setMobileOpen(false)}
              className="hover:text-amber-600"
            >
              Gallery
            </Link>
            <Link
              href="/pages/GuffGaf"
              onClick={() => setMobileOpen(false)}
              className="hover:text-amber-600"
            >
              Guff Gaff
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
