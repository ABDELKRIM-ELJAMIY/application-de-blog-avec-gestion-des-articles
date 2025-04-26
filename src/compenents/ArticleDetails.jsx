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
        console.log("Fetching article with ID:", id);
        const response = await axios.get(`http://localhost:3000/articles/${id}`);
        console.log("API response:", response.data);
        setArticle(response.data);
        setError(null);
      } catch (error) {
        console.error("Error loading article", error);
        setError("Failed to load article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!article || !article.id) return;
    
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`http://localhost:3000/articles/${article.id}`);
        navigate("/Accueil");
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("Failed to delete article");
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
      console.error("Update error:", error);
      alert("Failed to update article");
    }
  };
  
  

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-white p-4">Loading article...</div>
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
          Return to Home
        </button>
      </div>
    );
  }


  if (!article) {
    return (
      <div className="p-6">
        <div className="text-white p-4">Article not found.</div>
        <button 
          onClick={() => navigate("/Accueil")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Return to Home
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
            Category: {article.category}
          </p>
          <p className="mb-4">{article.content}</p>

          
          {isLoggedIn && (
            <div className="flex justify-center md:justify-start gap-4 mb-4">
              <button
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          )}

            {isEditing && (
              <form onSubmit={handleEdit} className="mt-6 space-y-4">
                <div>
                  <label className="block mb-2 font-semibold">Title:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Content:</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Category:</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Image URL:</label>
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
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

        </div>
        
      </div>

      <CommentSection articleId={article.id} isLoggedIn={isLoggedIn} username={username} />
    </div>

    

  );
};

export default ArticleDetails;
