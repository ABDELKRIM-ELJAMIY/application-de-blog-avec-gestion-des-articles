import React from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa"; // Importing a blog icon from react-icons

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo avec icône */}
                <div className="flex items-center space-x-2">
                    <FaBlog className="text-white text-3xl" /> {/* Logo avec icône */}
                    <Link to="/Accueil" className="text-white text-2xl font-semibold">
                        Wiame and Abdelkrim's World
                    </Link>
                </div>

                {/* Liens de navigation */}
                <div className="flex space-x-6">
                    <Link
                        to="/"
                        className="text-white hover:text-orange-500 transition duration-300"
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/login"
                        className="text-white hover:text-orange-500 transition duration-300"
                    >
                        Connexion
                    </Link>
                    <Link
                        to="/signup"
                        className="text-white hover:text-orange-500 transition duration-300"
                    >
                        Inscription
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
