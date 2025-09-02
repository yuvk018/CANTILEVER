
import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../api/NewsAPI";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getNews = async () => {
    setLoading(true);
    const data = await fetchNews(query, page);
    setArticles(data.articles || []);
    setTotalResults(data.totalResults || 0);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    getNews();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Inline Skeleton Loader
  const LoadingCard = () => (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="bg-gray-300 h-48 w-full rounded mb-4"></div>
      <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
      <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search news..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Articles */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No articles found.</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {page > 1 && (
              <button
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Prev
              </button>
            )}
            {page * 6 < totalResults && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
