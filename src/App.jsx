import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthForm from './compenents/AuthForm';
import Login from './compenents/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Routes>
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
