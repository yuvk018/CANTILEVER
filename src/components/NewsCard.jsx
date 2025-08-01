import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={article.urlToImage || "https://via.placeholder.com/400x200"}
        alt={article.title}
        className="rounded w-full h-48 object-cover"
      />
      <h2 className="text-lg font-bold mt-2">{article.title}</h2>
      <p className="text-sm mt-1">{article.description?.slice(0, 100)}...</p>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline mt-2 block"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
