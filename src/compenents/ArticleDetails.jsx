import React from 'react';
import CommentSection from './CommentSection';

const ArticleDetails = ({ article, onDelete, onEdit }) => {
  if (!article) return <div className="text-white">No article selected.</div>;

  return (
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
          onClick={() => onEdit(article)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <CommentSection/>
    </div>
  );
};

export default ArticleDetails;
