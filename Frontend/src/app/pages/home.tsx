import Image from "next/image";
import Link from "next/link";

export default function FirstPage() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
            <Image
              src="/cup.jpg"
              alt="Chiya Cup"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Sip, Savor, & Connect at{" "}
            <span className="text-amber-600">Chiya Khasauli</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover the rich flavors of Nepali chiya and snacks — the perfect
            spot for cozy chats.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/pages/Chiya"
              className="bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Sip First
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
