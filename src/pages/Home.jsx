import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Article from '../compenents/ArticleForm';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleArticleAdded = (newArticle) => {
        setArticles(prevArticles => [newArticle, ...prevArticles]);
        const modal = document.getElementById('article-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/articles');
                setArticles(response.data);
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

    return (
        <div className="min-h-screen bg-[#E0E1DD]">
            <section className="bg-[#778DA9] text-white py-16">
                <div className="text-center mb-8">
                    <button
                        data-modal-target="article-modal"
                        data-modal-toggle="article-modal"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B263B] hover:bg-[#415A77] text-[#E0E1DD] font-semibold rounded-full shadow-md transition duration-300"
                    >
                        <Plus size={20} />
                        Ajouter un article
                    </button>
                </div>

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre Blog</h1>
                    <p className="text-xl mb-6">Découvrez nos derniers articles sur le développement web</p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-[#1B263B] mb-8 text-center">Articles récents</h2>

                    {loading ? (
                        <p className="text-center text-[#1B263B]">Chargement...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-[#1B263B]">Aucun article disponible.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {articles.map(article => (
                                <div key={article.id} className="bg-[#0D1B2A] text-white rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <span className="px-3 py-1 bg-[#415A77] text-[#E0E1DD] rounded-full text-sm">
                                            {article.category}
                                        </span>
                                        <h3 className="text-xl font-bold my-2">{article.title}</h3>
                                        <p className="text-[#E0E1DD] mb-4">{article.content}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#778DA9] text-sm">
                                                {article.createdAt
                                                    ? new Date(article.createdAt).toLocaleDateString('fr-FR')
                                                    : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <div id="article-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Create New Article
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="article-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
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