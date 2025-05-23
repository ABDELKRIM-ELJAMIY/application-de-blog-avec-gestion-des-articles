import React from "react";
import { useNavigate, Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    if (!article || !article.title || !article.image) {
        return null;
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/articles/${article.id}`);
    };

    const authorInitial = article.author ? article.author.charAt(0) : "";

    return (
        <div onClick={handleClick} className="bg-[#E0E1DD] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="relative">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover"
                />
                {article.category && (
                    <span className="absolute top-3 right-3 bg-[#415A77] text-[#E0E1DD] text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category}
                    </span>
                )}
            </div>

            <div className="p-5 bg-[#1B263B]">
                <h2 className="text-xl font-bold text-[#E0E1DD] mb-3 line-clamp-2">{article.title}</h2>
                {article.content && (
                    <p className="text-[#778DA9] mb-4 line-clamp-3">
                        {article.content.substring(0, 120)}...
                    </p>
                )}

                <div className="pt-4 border-t border-[#415A77] flex items-center justify-between">
                    {article.author && (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-[#778DA9] flex items-center justify-center">
                                <span className="text-[#0D1B2A] font-bold">{authorInitial}</span>
                            </div>
                            <div>
                                <p className="font-medium text-sm text-[#E0E1DD]">{article.author}</p>
                                <p className="text-[#778DA9] text-xs">
                                    {article.createdRelative || "just now"} {article.readTime && `• ${article.readTime}`}
                                </p>
                            </div>
                        </div>
                    )}
                    {/* Le bouton 'Details' ici */}
                    <Link to={`/articles/${article.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
