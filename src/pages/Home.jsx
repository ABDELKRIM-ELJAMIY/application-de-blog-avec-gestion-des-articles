import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/articles');
                setArticles(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des articles.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-[#E0E1DD]">
            <section className="bg-[#778DA9] text-white py-16">
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/ArticleForm')}
                        className="bg-[#415A77] hover:bg-[#778DA9] text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
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
        </div>
    );
};

export default Home;
