import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Empêcher le défilement du body quand le menu est ouvert
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = () => {
    logout();
    handleLinkClick();
    navigate('/');
  };

  const getDashboardLink = () => {
    return user?.userType === 'organizer' ? '/dashboard/organizer' : '/dashboard/player';
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={handleLinkClick}>
        PlayZone
      </Link>
      
      <button 
        className="header__menu-button" 
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <span className="header__menu-icon"></span>
      </button>

      <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
        <Link to="/" className="header__nav-link" onClick={handleLinkClick}>
          Accueil
        </Link>
        <Link to="/tournaments" className="header__nav-link" onClick={handleLinkClick}>
          Tournois
        </Link>
        {user?.userType === 'organizer' && (
          <Link to="/create-tournament" className="header__nav-link" onClick={handleLinkClick}>
            Créer un tournoi
          </Link>
        )}
        {user ? (
          <>
            <Link 
              to={getDashboardLink()} 
              className="header__nav-link" 
              onClick={handleLinkClick}
            >
              {user.username} ({user.userType})
            </Link>
            <button onClick={handleLogout} className="btn btn--outline">
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn--outline" onClick={handleLinkClick}>
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;