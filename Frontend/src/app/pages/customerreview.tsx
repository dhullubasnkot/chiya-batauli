import ReviewData from "../reviewdata/reviewdata";

export default function ChiyaReviewsPage({ noslice = true }) {
  const displayedItems = noslice ? ReviewData.slice(0, 4) : ReviewData;

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-800 mb-8 text-center">
          Reviews for Chiya Khasauli
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition duration-300"
            >
              <div className="mb-2 text-lg font-semibold text-amber-700">
                {review.name}
              </div>
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
