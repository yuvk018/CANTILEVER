
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; 
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = async (category = "general", page = 1, query = "") => {
  try {
    const url = query
      ? `${BASE_URL}/everything?q=${query}&pageSize=6&page=${page}&apiKey=${API_KEY}`
      : `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=6&page=${page}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch news");

    const data = await response.json();
    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [], totalResults: 0 };
  }
};

