import React, { useState, useEffect } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem("comments");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse comments from localStorage", error);
      localStorage.removeItem("comments"); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentChange = (e) => {
    setInputText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newComment = {
      id: comments.length + 1,
      text: inputText,
      author: 'Anonymous',
      date: new Date().toLocaleString(),
    };
    
    setComments([...comments, newComment]);
    setInputText("");
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl text-white font-semibold mb-2">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full h-24 text-white p-2 border border-gray-400 rounded-md"
          placeholder="Write your comment..."
          value={inputText}
          onChange={handleCommentChange}
        />
        <button
          className="bg-[rgb(119,141,169)] text-white px-4 py-2 rounded hover:bg-[rgb(65,90,119)]"
        >
          Add Comment
        </button>
      </form>
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="text-gray-800 font-semibold mb-1">{comment.author}</p>
            <p className="text-gray-600">{comment.text}</p>
            <div className="flex items-center mt-4">
              <div className="ml-3">
                <p className="text-gray-800 text-sm">{comment.author}</p> 
                <p className="text-gray-500 text-xs">{comment.date}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
