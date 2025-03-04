import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

function TournamentCard({ id, game, date, players, status, location, city }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinTournament = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const [current, max] = players.split('/').map(num => parseInt(num));
    
    if (current >= max) {
      alert('Désolé, ce tournoi est complet !');
      return;
    }

    navigate(`/tournament/${id}?action=join`);
  };

  // Détermine la couleur du statut
  const getStatusColor = () => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('ouverte')) return 'status--open';
    if (statusLower.includes('complet')) return 'status--full';
    if (statusLower.includes('en cours')) return 'status--ongoing';
    if (statusLower.includes('terminé')) return 'status--ended';
    return '';
  };

  // Calcule le pourcentage de remplissage
  const [current, max] = players.split('/').map(num => parseInt(num));
  const fillPercentage = (current / max) * 100;

  return (
    <div className="tournament-card">
      <div className="tournament-card__header">
        <h3 className="tournament-card__game">{game}</h3>
        <span className={`tournament-card__status ${getStatusColor()}`}>
          {status}
        </span>
      </div>
      
      <div className="tournament-card__info">
        <div className="info-item">
          <i className="far fa-calendar-alt"></i>
          <span>{date}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-users"></i>
          <div className="players-info">
            <span>{players}</span>
            <div className="progress-bar">
              <div 
                className="progress-bar__fill" 
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="info-item">
          <i className={location === 'online' ? 'fas fa-globe' : 'fas fa-map-marker-alt'}></i>
          <span>{location === 'online' ? 'En ligne' : `${city}`}</span>
        </div>
      </div>

      <div className="tournament-card__actions">
        <Link to={`/tournament/${id}`} className="btn btn--outline">
          <i className="fas fa-info-circle"></i>
          Voir plus
        </Link>
        <button 
          onClick={handleJoinTournament} 
          className="btn btn--primary"
          disabled={status.toLowerCase() !== 'inscription ouverte'}
        >
          <i className="fas fa-trophy"></i>
          Rejoindre
        </button>
      </div>
    </div>
  );
}


TournamentCard.propTypes = {
  id: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  // Changeons Date en string ou instanceOf(Date) selon votre besoin
  date: PropTypes.string.isRequired, // Si vous passez la date comme une chaîne
  // OU
  // date: PropTypes.instanceOf(Date).isRequired, // Si vous passez un objet Date
  players: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};


export default TournamentCard



// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import PropTypes from 'prop-types';

// function TournamentCard({ 
//   id = '', 
//   game = '', 
//   date = '', 
//   players = '0/0', 
//   status = '', 
//   location = '', 
//   city = '' 
// }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleJoinTournament = () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     const [current, max] = players.split('/').map(num => parseInt(num, 10));
    
//     if (current >= max) {
//       alert('Désolé, ce tournoi est complet !');
//       return;
//     }

//     navigate(`/tournament/${id}?action=join`);
//   };

//   const getStatusColor = () => {
//     const statusLower = status.toLowerCase();
//     if (statusLower.includes('ouverte')) return 'status--open';
//     if (statusLower.includes('complet')) return 'status--full';
//     if (statusLower.includes('en cours')) return 'status--ongoing';
//     if (statusLower.includes('terminé')) return 'status--ended';
//     return '';
//   };

//   const [current, max] = players.split('/').map(num => parseInt(num, 10));
//   const fillPercentage = max > 0 ? (current / max) * 100 : 0;

//   return (
//     // Reste du code identique
//   );
// }

// TournamentCard.propTypes = {
//   id: PropTypes.string,
//   game: PropTypes.string,
//   date: PropTypes.string,
//   players: PropTypes.string,
//   status: PropTypes.string,
//   location: PropTypes.string,
//   city: PropTypes.string
// };

// export default TournamentCard;