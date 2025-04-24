import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './compenents/AuthForm'; 
import Login from './compenents/Login';       

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Routes>
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
