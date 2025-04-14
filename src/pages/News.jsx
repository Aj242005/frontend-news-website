import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import "../assets/style/Home.css";

const truncate = (text, wordLimit = 20) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [filterDays, setFilterDays] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const newsPerPage = 12;
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

  const getDateBefore = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const filteredArticles = articles.filter((article) => {
    const cutoffDate = getDateBefore(filterDays);
    return new Date(article.pubDate) >= cutoffDate;
  });

  const totalPages = Math.ceil(filteredArticles.length / newsPerPage);
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (isLoading) return <p className="text-center mt-5">Loading articles...</p>;
  if (error) return <p className="text-center mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">All News</h2>
        <select
          className="form-select w-auto"
          value={filterDays}
          onChange={(e) => {
            setFilterDays(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={7}>🗓 Last 1 Week</option>
          <option value={14}>🗓 Last 2 Weeks</option>
          <option value={21}>🗓 Last 3 Weeks</option>
          <option value={30}>🗓 Last 1 Month</option>
        </select>
      </div>

      <div className="row g-4">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
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
          ))
        ) : (
          <p>No news found for the selected time period.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
          <button className="btn btn-outline-primary" onClick={prevPage} disabled={currentPage === 1}>
            ⬅ Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => paginate(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button className="btn btn-outline-primary" onClick={nextPage} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
