import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/comments";

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}?articleId=${articleId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [articleId]);

  
  const handleCommentChange = (e) => {
    setInputText(e.target.value);
  };

  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newComment = {
      articleId,
      text: inputText,
      author: "Anonymous",
      date: new Date().toLocaleString(),
    };

    try {
      await axios.post(API_URL, newComment);
      // Refresh comments after posting
      const refreshed = await axios.get(`${API_URL}?articleId=${articleId}`);
      setComments(refreshed.data);
      setInputText("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl text-white font-semibold mb-2">Comments</h2>

      {/* --------Form------------- */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full h-24 text-white p-2 border border-gray-400 rounded-md"
          placeholder="Write your comment..."
          value={inputText}
          onChange={handleCommentChange}
        />
        <button
          type="submit"
          className="bg-[rgb(119,141,169)] text-white px-4 py-2 mt-2 rounded hover:bg-[rgb(65,90,119)]"
        >
          Add Comment
        </button>
      </form>

      {/* ------------Comment List--------------- */}
      <div className="mt-4">
        {comments.length === 0 && (
          <p className="text-white">No comments yet. Be the first!</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="text-gray-800 font-semibold mb-1">{comment.author}</p>
            <p className="text-gray-600">{comment.text}</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-gray-500 text-xs">{comment.date}</p>
              </div>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;


