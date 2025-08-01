
const API_KEY = import.meta.env.VITE_NEWS_API_KEY; 

export const fetchNews = async ({
  category = "general",
  query = "",
  page = 1,
}) => {
  try {
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.append("apiKey", API_KEY);
    url.searchParams.append("pageSize", 20);
    url.searchParams.append("page", page);

    if (category) {
      url.searchParams.append("category", category);
    }

    if (query) {
      url.searchParams.append("q", query);
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to fetch news");
    }

    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    };
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return {
      articles: [],
      totalResults: 0,
    };
  }
};
