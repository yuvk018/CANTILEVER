// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/NewsAPI";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNews({ category: "general" }).then((res) => {
      setNews(res.articles);
    });
  }, []);

  const handleSearch = async () => {
    const res = await fetchNews({ category: "general", query });
    setNews(res.articles);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search news..."
          className="border p-2 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {news.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
