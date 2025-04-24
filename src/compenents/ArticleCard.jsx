import React from "react";

const ArticleCard = () => {
    const article = {
        title: "React et Tailwind",
        image:"ttt",
        category: "Développement",
        content: "Découvrez comment construire des interfaces modernes avec React et Tailwind CSS. Apprenez à créer des composants réutilisables et à styliser rapidement vos applications avec des classes utilitaires. Cette combinaison puissante permet aux développeurs de créer des interfaces utilisateur réactives et esthétiques sans quitter votre fichier JSX.",
        author: "Marie Dupont",
        date: "24 Avril, 2025",
        readTime: "5 min"
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0D1B2A]">
            <div className="w-full max-w-4xl rounded-lg shadow-xl overflow-hidden bg-[#0D1B2A]">
                <div className="relative">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#415A77] text-[#E0E1DD] text-sm font-bold">
                        {article.category}
                    </div>
                </div>

                <div className="p-6 md:p-8 bg-[#1B263B]">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#E0E1DD] mb-4">{article.title}</h2>

                    <p className="text-[#778DA9] text-base md:text-lg leading-relaxed mb-6">
                        {article.content}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#415A77]">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="w-10 h-10 rounded-full bg-[#778DA9] flex items-center justify-center mr-3">
                                <span className="text-[#0D1B2A] font-bold text-sm">MD</span>
                            </div>
                            <div>
                                <p className="text-[#E0E1DD] text-sm font-medium">{article.author}</p>
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
