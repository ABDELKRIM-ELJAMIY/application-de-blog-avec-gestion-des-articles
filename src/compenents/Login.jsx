import React, { useState } from 'react';
import Image from './images/BLOG.jpg';
import '../App.css'
import { useNavigate } from 'react-router-dom';


function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est obligatoire';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format invalide';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Ce champ est obligatoire';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const savedData = JSON.parse(localStorage.getItem('userData'));

      if (savedData && savedData.email === formData.email && savedData.password === formData.password) {
        setSuccessMessage('Connexion réussie !');

        localStorage.setItem("username", savedData.username);

        setIsLoggedIn(true);

        navigate('/'); 

      } else {
        setErrors({ email: '', password: 'Email ou mot de passe incorrect' });
      }
    }
    

  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center bg-[rgb(13,27,42)] items-center px-4" >
      <h1 className="text-4xl md:text-5xl text-white font-bold mb-8  bg-opacity-40 px-6 py-4 rounded-lg">
        Welcome to your blog
      </h1>
      <div className=" bg-[rgb(224,225,221)] p-8 md:p-12 rounded-lg shadow-2xl max-w-md w-full backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border text-black border-black rounded-lg"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1 text-black font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-black text-black rounded-lg"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Log In
          </button>
        </form>
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
        <p className="text-center text-black mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
