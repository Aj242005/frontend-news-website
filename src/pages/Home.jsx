import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/style/Home.css";
import { FaArrowRight } from "react-icons/fa6";

const truncate = (text, wordLimit = 20) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = "https://backend-main-news-website.onrender.com";

  useEffect(() => {
    fetch(`${backendUrl}/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        // Sort articles by publication date (descending)
        const sorted = data.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setArticles(sorted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching articles.");
        setIsLoading(false);
      });
  }, [backendUrl]);

  if (isLoading) return <p className="text-center mt-5">Loading articles...</p>;
  if (error) return <p className="text-center mt-5">{error}</p>;

  // Featured: Top 3 articles; Latest: Next 8 articles
  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.slice(3, 11);

  return (
    <div>
      <section className="my-5">
        <h2 className="mb-4">Featured News</h2>
        <div className="row g-4">
          {featuredArticles.map((article, index) => (
            <div key={article.article_id} className={index === 0 ? "col-12 col-lg-8" : "col-12 col-lg-4"}>
              <div className="card h-100">
                <div className="zoom-img">
                  <img src={article.image_url} alt={article.title} className="card-img-top" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="text-muted mb-1">
                    {new Date(article.pubDate).toLocaleDateString()} | {article.creator || "Unknown"}
                  </p>
                  <p className="badge bg-danger">{article.source_name || "News"}</p>
                  <p className="card-text">{truncate(article.description || "", 25)}</p>
                  <Link to={`/news/${article.article_id}`} className="readMoreLink text-dark text-decoration-none">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-5">
        <h2 className="mb-4">Latest News</h2>
        <div className="row g-4">
          {latestArticles.map((article) => (
            <div className="col-12 col-md-6 col-lg-3" key={article.article_id}>
              <div className="card h-100">
                <div className="zoom-img">
                  <img src={article.image_url} alt={article.title} className="card-img-top" />
                </div>
                <div className="card-body">
                  <h6 className="card-title">{article.title}</h6>
                  <p className="text-muted mb-1">
                    {new Date(article.pubDate).toLocaleDateString()} | {article.creator || "Unknown"}
                  </p>
                  <p className="badge bg-danger">{article.source_name || "News"}</p>
                  <p className="card-text">{truncate(article.description || "", 20)}</p>
                  <Link to={`/news/${article.article_id}`} className="readMoreLink text-dark text-decoration-none">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
