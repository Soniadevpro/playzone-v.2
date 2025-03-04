import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3>PlayZone</h3>
          <p>La plateforme de tournois de jeux vidéo pour tous les joueurs.</p>
        </div>
        
        <div className="footer__section">
          <h3>Liens rapides</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/create-tournament">Créer un tournoi</Link></li>
            <li><Link to="/login">Connexion</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Contact</h3>
          <ul>
            <li>Email: contact@playzone.com</li>
            <li>Discord: PlayZone#1234</li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Suivez-nous</h3>
          <div className="social-links">
            <a href="https://twitter.com/playzone" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://discord.gg/playzone" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://twitch.tv/playzone" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitch"></i>
            </a>
            <a href="https://youtube.com/playzone" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} PlayZone. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;