// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNews } from "../api/NewsAPI";
import NewsCard from "../components/NewsCard";

const Category = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews({ category }).then((res) => {
      setNews(res.articles);
    });
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold capitalize mb-4">{category} News</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {news.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Category;
