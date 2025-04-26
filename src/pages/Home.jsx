import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import ArticleCard from '../compenents/ArticleCard';
import Article from '../compenents/ArticleForm';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleArticleAdded = (newArticle) => {
        if (newArticle && newArticle.title && newArticle.image) {
            setArticles(prevArticles => [newArticle, ...prevArticles]);
        }
        const modal = document.getElementById('article-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/articles');
                const validArticles = response.data.filter(article =>
                    article && article.title && article.image
                );
                setArticles(validArticles);
            } catch (err) {
                setError('Erreur lors du chargement des articles.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();

        const setupModal = () => {
            const modalToggle = document.querySelector('[data-modal-toggle="article-modal"]');
            modalToggle?.addEventListener('click', () => {
                const modal = document.getElementById('article-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });

            const closeButtons = document.querySelectorAll('[data-modal-hide="article-modal"]');
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modal = document.getElementById('article-modal');
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                });
            });
        };

        setTimeout(setupModal, 100);

        return () => {
            const modalToggle = document.querySelector('[data-modal-toggle="article-modal"]');
            modalToggle?.removeEventListener('click', () => { });

            const closeButtons = document.querySelectorAll('[data-modal-hide="article-modal"]');
            closeButtons.forEach(button => {
                button.removeEventListener('click', () => { });
            });
        };
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('userData');
        setIsLoggedIn(!!user);
    }, []);

    // Filtres d'articles
    const filteredArticles = articles.filter((article) => {
        const matchesTitle = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
        return matchesTitle && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#E0E1DD]">

            {/* Hero Section */}
            <section className="bg-[#1B263B] text-[#E0E1DD] py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-8 md:mb-0 md:w-2/3">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur notre Blog</h1>
                            <p className="text-xl text-[#778DA9] mb-6">Découvrez nos derniers articles sur le développement web</p>
                        </div>
                        <div className="md:w-1/3 flex justify-center md:justify-end">
                            {isLoggedIn && (
                                <button
                                    data-modal-target="article-modal"
                                    data-modal-toggle="article-modal"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#415A77] hover:bg-[#778DA9] text-[#E0E1DD] font-semibold rounded-lg text-sm shadow-lg transition duration-300"
                                >
                                    <Plus size={20} />
                                    Ajouter un article
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtres Section */}
            <section className="py-8 bg-[#1B263B] text-[#E0E1DD]">
                <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou mot-clé"
                        className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-[#415A77] bg-[#1B263B] text-[#E0E1DD] placeholder-[#778DA9] focus:outline-none focus:ring-2 focus:ring-[#778DA9]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-[#415A77] bg-[#1B263B] text-[#E0E1DD] focus:outline-none focus:ring-2 focus:ring-[#778DA9]"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value=""> Toutes les catégories</option>
                        {Array.from(new Set(articles.map(article => article.category).filter(Boolean))).map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </section>

            {/* Articles Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-[#0D1B2A] mb-2 text-center">Articles récents</h2>
                    <div className="w-24 h-1 bg-[#415A77] mx-auto mb-12"></div>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className="w-16 h-16 border-4 border-[#415A77] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
                            {error}
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <div className="bg-[#778DA9] p-8 rounded-lg text-center">
                            <p className="text-[#E0E1DD] text-lg">Aucun article disponible.</p>
                            <p className="text-[#E0E1DD] opacity-80">Soyez le premier à en ajouter un!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map((article, index) => {
                                if (!article || !article.title || !article.image) return null;
                                return (
                                    <ArticleCard
                                        key={`${article.id || 'article'}-${index}`}
                                        article={article}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal */}
            <div id="article-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-[#E0E1DD] rounded-lg shadow-lg">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-[#778DA9]">
                            <h3 className="text-xl font-semibold text-[#0D1B2A]">
                                Créer un nouvel article
                            </h3>
                            <button type="button" className="text-[#415A77] bg-transparent hover:bg-[#778DA9] hover:text-[#E0E1DD] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="article-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Fermer le modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            <Article onArticleAdded={handleArticleAdded} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
