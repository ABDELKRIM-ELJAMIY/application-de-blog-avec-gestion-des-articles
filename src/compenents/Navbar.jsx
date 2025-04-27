import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setIsLoggedIn(false);

    window.location.reload();

    navigate("/");
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FaBlog className="text-white text-3xl" />
          <Link to="/Accueil" className="text-white text-2xl font-bold">
            Wiame and Abdelkrim's World
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-orange-500 transition-colors duration-300"
          >
            Accueil
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-orange-500 transition-colors duration-300"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-orange-500 transition-colors duration-300"
              >
                Inscription
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 transition-colors duration-300"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
