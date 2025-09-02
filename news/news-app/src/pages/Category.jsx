
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNews } from "../api/NewsAPI";
import NewsCard from "../components/NewsCard";

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadNews();
  }, [category, page]);

  const loadNews = async () => {
    setLoading(true);
    const res = await fetchNews(category, page, "");
    setArticles(res.articles);
    setTotalResults(res.totalResults);
    setLoading(false);
  };

  const handleNext = () => {
    if (page < Math.ceil(totalResults / 6)) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold capitalize mb-6">{category} News</h1>

      {loading ? (
        <p>Loading...</p>
      ) : articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <NewsCard key={idx} article={article} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(totalResults / 6)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No news found in this category.</p>
      )}
    </div>
  );
};

export default Category;
