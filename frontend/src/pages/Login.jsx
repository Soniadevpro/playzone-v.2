import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      // Simuler la connexion
      const success = login(formData.email, formData.password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Connexion</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-form__error">
            {error}
          </div>
        )}
        <div className="auth-form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-form__group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Se connecter
        </button>
      </form>
      <p className="auth-page__link">
        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </div>
  );
}

export default Login;