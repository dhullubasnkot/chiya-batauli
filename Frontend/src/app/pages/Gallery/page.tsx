import GalleryPrograms from "@/app/gallerydata/gallerydata";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Gallery() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen  p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-amber-800 mb-10 text-center drop-shadow-md">
          Khasauli Gallery
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {GalleryPrograms.map((program) => (
            <Link href={`/gallery/${program.id}`} key={program.id}>
              <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group">
                <Image
                  src={program.coverImage}
                  alt={program.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40 sm:h-44 lg:h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm sm:text-base font-semibold text-center px-2">
                    {program.name}
                  </p>
                </div>
                <div className="p-2 bg-white text-center text-amber-700 text-sm font-medium group-hover:text-amber-900 transition-colors duration-300">
                  {program.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
