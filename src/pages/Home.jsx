import React from 'react';
import reactimg from "../assets/React-JS.png"
const Home = () => {
    const articles = [
        {
            id: 1,
            title: "Introduction à React",
            content: "React est une bibliothèque JavaScript pour la création d'interfaces utilisateur. Développée par Facebook, elle permet de construire des applications web à page unique ou des applications mobiles.",
            image: reactimg,
            category: "Développement Web",
            author: "Marie Dupont",
            createdAt: "2025-04-18T10:30:00Z"
        },
        {
            id: 2,
            title: "Comprendre le JSX",
            content: "Le JSX est une syntaxe qui permet d'écrire des éléments React en utilisant une syntaxe proche de HTML. Il est transformé en appels JavaScript par Babel.",
            image: reactimg,
            category: "Développement Web",
        },
        {
            id: 3,
            title: "Les Hooks en React",
            content: "Les Hooks sont une nouvelle façon de gérer l'état et le cycle de vie des composants fonctionnels dans React. Ils permettent d'utiliser l'état sans écrire de classes.",
            image: reactimg,
            category: "Développement Web",
        },
        {
            id: 4,
            title: "Gestion de l'état avec Redux",
            content: "Redux est une bibliothèque JavaScript pour la gestion de l'état des applications. Elle est souvent utilisée avec React pour gérer l'état global de l'application.",
            image: reactimg,
            category: "Développement Web",
        },
        {
            id: 5,
            title: "React Router pour la navigation",
            content: "React Router est une bibliothèque qui permet de gérer la navigation dans les applications React. Elle permet de créer des routes et de naviguer entre elles.",
            image: reactimg,
            category: "Développement Web",
        }
        
    ];

    return (
        <div className="min-h-screen bg-[#E0E1DD]">
            <section className="bg-[#778DA9] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre Blog</h1>
                    <p className="text-xl mb-6">Découvrez nos derniers articles sur le développement web</p>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-[#1B263B] mb-8 text-center">Articles récents</h2>
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
                                            {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                                        </span>
                                        {/* <Link
                                            to={`/article/${article.id}`}
                                            className="text-[#415A77] hover:text-[#778DA9] font-medium"
                                        >
                                            Lire la suite
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
