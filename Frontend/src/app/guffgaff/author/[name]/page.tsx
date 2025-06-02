import Image from "next/image";
import GuffGaffData from "@/app/GuffGaffdata/guffdata";
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import Footer from "@/app/components/footer";

type Poem = {
  id: string | number;
  author: string;
  image: string;
  content: string;
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};

// Mark component async
export default async function AuthorPoemsPage({ params }: Props) {
  // Await params before use
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);

  const poemsByAuthor: Poem[] = GuffGaffData.filter(
    (poem: Poem) => poem.author === decodedName
  );

  const similarPoems: Poem[] = GuffGaffData.filter(
    (poem: Poem) => poem.author !== decodedName
  ).slice(0, 3);

  if (poemsByAuthor.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl border border-red-200">
          <h1 className="text-4xl font-extrabold text-red-700 mb-4 animate-bounce">
            Oops!
          </h1>
          <p className="text-xl text-gray-700">
            No poems found for{" "}
            <span className="font-semibold text-red-600">{decodedName}</span>.
          </p>
          <p className="text-md text-gray-500 mt-2">
            Perhaps try searching for another author?
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-center text-amber-800 mb-12 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              Poems by {decodedName}
            </span>
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {poemsByAuthor.map((poem) => (
              <div
                key={poem.id}
                className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200 flex flex-col"
              >
                <div className="flex items-center gap-6 mb-6">
                  <Image
                    src={poem.image}
                    alt={poem.author}
                    width={120}
                    height={120}
                    priority
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-400 p-1"
                  />
                  <div>
                    <p className="font-bold text-xl text-amber-700">
                      {poem.author}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed text-lg flex-grow">
                  {poem.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-amber-700 mb-6">
              Similar Guff
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarPoems.map((poem) => (
                <div
                  key={poem.id}
                  className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                >
                  <Link
                    href={`/guffgaff/author/${encodeURIComponent(poem.author)}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={poem.image}
                        alt={poem.author}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-400"
                      />
                      <div>
                        <p className="font-bold text-orange-700">
                          {poem.author}
                        </p>
                        <p className="text-xs text-gray-500">Contributor</p>
                      </div>
                    </div>
                  </Link>
                  <p className="text-gray-700 text-sm line-clamp-4">
                    {poem.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
