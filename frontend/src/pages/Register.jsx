import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    userType: 'player', // 'player' ou 'organizer'
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

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // TODO: Implémenter la logique d'inscription
    console.log('Données d\'inscription:', formData);
    
    // Redirection vers la page de connexion après inscription
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Inscription</h1>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-form__error">
            {error}
          </div>
        )}

        <div className="auth-form__group">
          <label htmlFor="username">Nom dutilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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
            minLength="6"
          />
        </div>

        <div className="auth-form__group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <div className="auth-form__group">
          <label>Type de compte</label>
          <div className="auth-form__radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="player"
                name="userType"
                value="player"
                checked={formData.userType === 'player'}
                onChange={handleChange}
              />
              <label htmlFor="player">Joueur</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="organizer"
                name="userType"
                value="organizer"
                checked={formData.userType === 'organizer'}
                onChange={handleChange}
              />
              <label htmlFor="organizer">Organisateur</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn--primary">
          S'inscrire
        </button>
      </form>

      <p className="auth-page__link">
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}

export default Register;