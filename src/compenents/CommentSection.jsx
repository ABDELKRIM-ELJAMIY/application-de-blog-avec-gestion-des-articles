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
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
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

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
     setComments(updatedComments);
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
            <button  
              onClick={() => handleDelete(comment.id)} // Corrected function call
              className="text-lg rounded font-medium bg-red-500 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth="1.5" stroke="currentColor" className="size-6" // Fixed className
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 
                    2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 
                    .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0
                    0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
