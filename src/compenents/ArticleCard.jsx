import React from "react";
import skyImage from '../assets/sky.jpg';

const ArticleCard = () => {
    const article = {
        title: "React et Tailwind",
        image: skyImage,
        category: "Développement",
        content: "Découvrez comment construire des interfaces modernes avec React et Tailwind CSS. Apprenez à créer des composants réutilisables et à styliser rapidement vos applications avec des classes utilitaires. Cette combinaison puissante permet aux développeurs de créer des interfaces utilisateur réactives et esthétiques sans quitter votre fichier JSX.",
        author: "Marie Dupont",
        date: "24 Avril, 2025",
        readTime: "5 min"
    };

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="rounded-lg shadow-lg overflow-hidden bg-[#0D1B2A]">
                <div className="relative">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#415A77] text-[#E0E1DD] text-sm font-bold">
                        {article.category}
                    </div>
                </div>

                <div className="p-4 bg-[#1B263B]">
                    <h2 className="text-lg font-bold text-[#E0E1DD] mb-2">{article.title}</h2>

                    <p className="text-[#778DA9] text-sm leading-relaxed mb-4">
                        {article.content.substring(0, 100)}...
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-[#415A77]">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="w-8 h-8 rounded-full bg-[#778DA9] flex items-center justify-center mr-2">
                                <span className="text-[#0D1B2A] font-bold text-xs">MD</span>
                            </div>
                            <div>
                                <p className="text-[#E0E1DD] text-xs font-medium">{article.author}</p>
                                <p className="text-[#778DA9] text-xs">{article.date} • {article.readTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
