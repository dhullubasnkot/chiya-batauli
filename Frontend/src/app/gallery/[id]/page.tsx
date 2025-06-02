"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import GalleryPrograms from "@/app/gallerydata/gallerydata";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ProgramGallery({ params }: Props) {
  const resolvedParams = use(params);
  const program = GalleryPrograms.find(
    (p) => p.id === Number(resolvedParams.id)
  );

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!program) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalIndex !== null) {
        if (event.key === "Escape") {
          closeModal();
        } else if (event.key === "ArrowLeft" && modalIndex > 0) {
          setModalIndex(modalIndex - 1);
        } else if (
          event.key === "ArrowRight" &&
          modalIndex < program.images.length - 1
        ) {
          setModalIndex(modalIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIndex, program?.images.length]);

  if (!program) return notFound();

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 sm:p-10 lg:p-16">
        <h1 className="mt-2 text-3xl sm:text-4xl text-center font-bold text-amber-800">
          {program.name}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 mt-6">
          {program.images.map((img, index) => (
            <ZoomImage
              key={index}
              src={img}
              alt={`Image ${index + 1} of ${program.name}`}
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        {modalIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="relative w-full h-full max-w-screen-xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={program.images[modalIndex]}
                alt={`Full image ${modalIndex + 1} of ${program.name}`}
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
              />

              {/* Image Count Overlay */}
              <div className="absolute top-4 left-4 text-white bg-black/60 px-3 py-1 rounded-full text-sm z-50">
                {modalIndex + 1} / {program.images.length}
              </div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-amber-900 text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={closeModal}
                aria-label="Close image modal"
              >
                &times;
              </button>

              {/* Left Arrow */}
              {modalIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-amber-900 text-4xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  onClick={() => setModalIndex(modalIndex - 1)}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
              )}

              {/* Right Arrow */}
              {modalIndex < program.images.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white hover:text-amber-900 text-4xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  onClick={() => setModalIndex(modalIndex + 1)}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

function ZoomImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md border border-gray-200 cursor-pointer 
                 transform hover:scale-[1.03] transition-all duration-300 ease-in-out
                 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      tabIndex={0}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white text-sm sm:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          {alt}
        </p>
      </div>
    </div>
  );
}
