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

  const handleEdit = () => {
    if (!article || !article.id) return;
    navigate(`/edit/${article.id}`);
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
    <div className="p-6">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-6 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Category: {article.category}</p>
        <p className="mb-4">{article.content}</p>
        {article.image && (
          <img
            src={article.image}
            alt="Article"
            className="w-64 h-64 object-cover rounded border mb-4"
          />
        )}

        <div className="flex gap-4">
          <button
            onClick={handleEdit}
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

        <CommentSection articleId={article.id} />
      </div>
    </div>
  );
};

export default ArticleDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Import CommentSection
// import CommentSection from './CommentSection';

// // Combined ArticleDetails component that handles both fetching and displaying article data
// const ArticleDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       if (!id) {
//         setError("No article ID provided");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         console.log("Fetching article with ID:", id);
//         const response = await axios.get(`http://localhost:3000/articles/${id}`);
//         console.log("API response:", response.data);
//         setArticle(response.data);
//         setError(null);
//       } catch (error) {
//         console.error("Error loading article", error);
//         setError("Failed to load article. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   const handleDelete = async () => {
//     if (!article || !article.id) return;
    
//     if (window.confirm("Are you sure you want to delete this article?")) {
//       try {
//         await axios.delete(`http://localhost:3000/articles/${article.id}`);
//         navigate("/Accueil");
//       } catch (error) {
//         console.error("Failed to delete article:", error);
//         alert("Failed to delete article");
//       }
//     }
//   };

//   const handleEdit = () => {
//     if (!article || !article.id) return;
//     navigate(`/edit/${article.id}`);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <div className="text-white p-4">Loading article...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="text-white p-4 bg-red-600 rounded">{error}</div>
//         <button 
//           onClick={() => navigate("/Accueil")}
//           className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//         >
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   // No article found state
//   if (!article) {
//     return (
//       <div className="p-6">
//         <div className="text-white p-4">Article not found.</div>
//         <button 
//           onClick={() => navigate("/Accueil")}
//           className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//         >
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   // Article display
//   return (
//     <div className="p-6">
//       <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mt-6 text-gray-900 dark:text-white">
//         <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
//         <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Category: {article.category}</p>
//         <p className="mb-4">{article.content}</p>
//         {article.image && (
//           <img
//             src={article.image}
//             alt="Article"
//             className="w-64 h-64 object-cover rounded border mb-4"
//           />
//         )}

//         <div className="flex gap-4">
//           <button
//             onClick={handleEdit}
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//           >
//             Delete
//           </button>
//         </div>

//         {/* Include the Comment Section with the article ID */}
//         <CommentSection articleId={article.id} />
//       </div>
//     </div>
//   );
// };

// export default ArticleDetails;