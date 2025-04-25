// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import AuthForm from './compenents/AuthForm';
// import Login from './compenents/Login';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <Routes>
//         <Route path="/signup" element={<AuthForm />} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import { Routes, Route, useLocation } from 'react-router-dom'
import ArticleForm from './compenents/ArticleForm'
import ArticleCard from './compenents/ArticleCard'
import Navbar from './compenents/Navbar'
import AuthForm from './compenents/AuthForm'
import Login from './compenents/Login'
import Home from './pages/Home'
import Footer from './compenents/Footer'

function ArticleDetails() {
  const location = useLocation()

  const showNavbar = !['/login', '/signup'].includes(location.pathname)

  return (
    <div>
      {showNavbar && <Navbar />}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/Accueil" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/ArticleForm" element={<ArticleForm />} />
          <Route path="/ArticleCard" element={<ArticleCard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<AuthForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default ArticleDetails
