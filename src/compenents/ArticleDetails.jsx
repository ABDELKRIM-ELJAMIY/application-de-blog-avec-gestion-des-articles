import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article :", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div className="text-white">Chargement de l'article...</div>;

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-6 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Catégorie : {article.category}</p>
      <p className="mb-4">{article.content}</p>
      {article.image && (
        <img
          src={article.image}
          alt="Article"
          className="w-64 h-64 object-cover rounded border mb-4"
        />
      )}
      <CommentSection />
    </div>
  );
};

export default ArticleDetails;
