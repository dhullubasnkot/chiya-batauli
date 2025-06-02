import Image from "next/image";
import Link from "next/link";

type Item = {
  id: string | number;
  name: string;
  price: number;
  image: string;
};

interface TemplateProps {
  title?: string;
  title1?: string;
  items: Item[];
  noslice?: boolean;
  taste?: string;
  buttonText?: string;
}

export default function Template({
  title,
  title1,
  items,
  noslice,
  taste,
  buttonText,
}: TemplateProps) {
  const displayedItems = noslice ? items.slice(0, 4) : items;

  return (
    <section className="w-full py-10 px-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-800">
            {title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            {title1}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedItems?.map((item, index) => {
            const { name, price, image } = item;

            return (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition duration-300 p-3 sm:p-4 flex flex-col items-center"
              >
                <div className="w-full h-32 sm:h-40 md:h-48 relative mb-3 sm:mb-4">
                  <Link href={`/items/${item.id}`} key={item.id}>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </Link>
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-amber-700 text-center">
                  {name}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center">
                  Rs. {price}
                </p>
              </div>
            );
          })}
        </div>

        {noslice && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <Link href={taste as string}>
              <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition duration-300 text-sm sm:text-base">
                {buttonText}
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
