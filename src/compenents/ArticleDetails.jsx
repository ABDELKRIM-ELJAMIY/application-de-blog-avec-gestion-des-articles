import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: ''
  });

  const username = localStorage.getItem('username');
  const isLoggedIn = Boolean(username);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        setArticle(response.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
        setError("Échec du chargement de l'article. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!article || !article.id) return;

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`http://localhost:3000/articles/${article.id}`);
        navigate("/Accueil");
      } catch (error) {
        console.error("Échec de la suppression de l'article:", error);
        alert("Échec de la suppression de l'article");
      }
    }
  };

  const handleEditClick = () => {
    if (!article) return;
    setIsEditing(true);
    setFormData({
      title: article.title || '',
      content: article.content || '',
      category: article.category || '',
      image: article.image || ''
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedArticle = {
        ...article,
        ...formData,
      };

      const response = await axios.put(`http://localhost:3000/articles/${article.id}`, updatedArticle);
      setArticle(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Échec de la mise à jour de l'article");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-white p-4">Chargement de l'article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-white p-4 bg-red-600 rounded">{error}</div>
        <button
          onClick={() => navigate("/Accueil")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-6">
        <div className="text-white p-4">Article introuvable.</div>
        <button
          onClick={() => navigate("/Accueil")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-auto w-full bg-white p-6 dark:bg-gray-700 rounded-lg shadow-md mt-6 text-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {article.image && (
          <div className="flex-shrink-0">
            <img
              src={article.image}
              alt="Article"
              className="w-64 h-64 object-cover rounded border mb-4 md:mb-0"
            />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Catégorie : {article.category}
          </p>
          <p className="mb-4">{article.content}</p>

          {isLoggedIn && (
            <div className="flex justify-center md:justify-start gap-4 mb-4">
              <button
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Supprimer
              </button>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleEdit} className="mt-6 space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Titre :</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Contenu :</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Catégorie :</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">URL de l'image :</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Commentaires */}
      <CommentSection articleId={article.id} isLoggedIn={isLoggedIn} username={username} />
    </div>
  );
};

export default ArticleDetails;
