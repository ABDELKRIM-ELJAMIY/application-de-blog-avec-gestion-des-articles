import { Routes, Route, useLocation } from 'react-router-dom';
import ArticleForm from './compenents/ArticleForm';
import ArticleCard from './compenents/ArticleCard';
import Navbar from './compenents/Navbar';
import AuthForm from './compenents/AuthForm';
import Login from './compenents/Login';
import Home from './pages/Home';
import Footer from './compenents/Footer';
import CommentSection from './compenents/CommentSection';
import ArticleDetails from './compenents/ArticleDetails';

function App() {
  const location = useLocation();

  // Show the Navbar only on specific routes
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/Accueil" element={<Home />} />
          <Route path="/ArticleForm" element={<ArticleForm />} />
          <Route path="/ArticleCard" element={<ArticleCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/comment" element={<CommentSection />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
