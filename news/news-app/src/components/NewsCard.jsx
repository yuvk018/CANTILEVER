
import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <img
        src={
          article.urlToImage ||
          "https://via.placeholder.com/400x200?text=No+Image"
        }
        alt={article.title}
        className="rounded w-full h-48 object-cover"
      />
      <h2 className="text-lg font-bold mt-3 text-white">{article.title}</h2>
      <p className="text-sm mt-2 text-gray-300">
        {article.description?.slice(0, 100) || "No description available"}...
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:text-blue-300 mt-3 block font-medium"
      >
        Read more →
      </a>
    </div>
  );
};

export default NewsCard;
