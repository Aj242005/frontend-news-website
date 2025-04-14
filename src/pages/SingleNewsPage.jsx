import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTag, FaCalendarAlt, FaUser } from "react-icons/fa";

const SingleNewsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = "https://backend-main-news-website.onrender.com";

  useEffect(() => {
    // Fetch all articles and find the one matching the article_id
    fetch(`${backendUrl}/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.article_id === id);
        if (found) {
          setArticle(found);
        } else {
          setError("Article not found.");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching the article.");
        setIsLoading(false);
      });
  }, [id, backendUrl]);

  if (isLoading) return <p className="text-center mt-5">Loading article...</p>;
  if (error) return <p className="text-center mt-5">{error}</p>;
  if (!article) return null;

  return (
    <div className="container my-5">
      <img src={article.image_url} alt={article.title} className="img-fluid rounded mb-4" />
      <h1>{article.title}</h1>
      <div className="d-flex flex-wrap text-muted mb-3 gap-3">
        <span>
          <FaCalendarAlt className="me-2" /> {new Date(article.pubDate).toLocaleDateString()}
        </span>
        <span>
          <FaUser className="me-2" /> {article.creator || "Unknown"}
        </span>
        <span>
          <FaTag className="me-2" /> {article.source_name || "News"}
        </span>
      </div>
      {/* If keywords exist, display them as badges */}
      {article.keywords && article.keywords.length > 0 && (
        <div className="mb-4">
          {article.keywords.map((tag, idx) => (
            <span key={idx} className="badge bg-primary me-2">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <p className="fs-5">{article.description}</p>
      <p>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
      </p>
    </div>
  );
};

export default SingleNewsPage;
