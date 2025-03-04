import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function TournamentDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info'); // 'info' ou 'bracket'
  
  // Mock data - to be replaced with actual data
  const tournament = {
    game: "League of Legends",
    date: "20 Avril 2024",
    players: "16/32",
    status: "Inscription ouverte",
    description: "Tournoi amateur de League of Legends. Tous les niveaux sont les bienvenus !",
    organizer: "GameMaster123",
    rules: "Double élimination, BO3 en finale",
    entryFee: 10,
    prize: 500,
    location: "local",
    address: "15 rue des Sports",
    city: "Paris",
    platform: "Discord",
    requirements: "PC avec League of Legends installé, casque obligatoire",
    gameImage: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
    bracket: {
      rounds: [
        {
          name: "Quarts de finale",
          matches: [
            { player1: "Team1", player2: "Team2", score1: 2, score2: 1 },
            { player1: "Team3", player2: "Team4", score1: 0, score2: 2 },
            { player1: "Team5", player2: "Team6", score1: 2, score2: 0 },
            { player1: "Team7", player2: "Team8", score1: 1, score2: 2 }
          ]
        },
        {
          name: "Demi-finales",
          matches: [
            { player1: "Team1", player2: "Team4", score1: null, score2: null },
            { player1: "Team5", player2: "Team8", score1: null, score2: null }
          ]
        },
        {
          name: "Finale",
          matches: [
            { player1: "À déterminer", player2: "À déterminer", score1: null, score2: null }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    if (searchParams.get('action') === 'join') {
      handleJoinTournament();
    }
  }, []);

  const handleJoinTournament = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const [current, max] = tournament.players.split('/').map(num => parseInt(num));
    
    if (current >= max) {
      alert('Désolé, ce tournoi est complet !');
      return;
    }

    // TODO: Implémenter la logique d'inscription au tournoi
    alert('Inscription au tournoi confirmée !');
  };

  return (
    <div className="tournament-details">
      <div className="tournament-details__hero" style={{ backgroundImage: `url(${tournament.gameImage})` }}>
        <div className="tournament-details__hero-content">
          <h1 className="tournament-details__title">{tournament.game}</h1>
          <div className="tournament-details__prize-info">
            <div className="prize-item">
              <i className="fas fa-ticket-alt"></i>
              <span>Prix dentrée</span>
              <strong>{tournament.entryFee}€</strong>
            </div>
            <div className="prize-item">
              <i className="fas fa-trophy"></i>
              <span>Récompense</span>
              <strong>{tournament.prize}€</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="tournament-details__content">
        <div className="tournament-details__tabs">
          <button 
            className={`tab-btn ${activeTab === 'info' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <i className="fas fa-info-circle"></i>
            Informations
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bracket' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('bracket')}
          >
            <i className="fas fa-sitemap"></i>
            Arbre de combat
          </button>
        </div>

        {activeTab === 'info' ? (
          <>
            <div className="tournament-details__info">
              <div className="info-group">
                <h3><i className="far fa-calendar-alt"></i> Date</h3>
                <p>{tournament.date}</p>
              </div>
              <div className="info-group">
                <h3><i className="fas fa-users"></i> Participants</h3>
                <p>{tournament.players}</p>
              </div>
              <div className="info-group">
                <h3><i className="fas fa-info-circle"></i> Status</h3>
                <p>{tournament.status}</p>
              </div>
              <div className="info-group">
                <h3><i className="fas fa-user-shield"></i> Organisateur</h3>
                <p>{tournament.organizer}</p>
              </div>
              <div className="info-group">
                <h3>
                  <i className={tournament.location === 'online' ? 'fas fa-globe' : 'fas fa-map-marker-alt'}></i>
                  {tournament.location === 'online' ? ' Plateforme' : ' Lieu'}
                </h3>
                {tournament.location === 'online' ? (
                  <p>{tournament.platform}</p>
                ) : (
                  <p>{tournament.address}, {tournament.city}</p>
                )}
              </div>
            </div>

            <div className="tournament-details__section">
              <h3><i className="fas fa-align-left"></i> Description</h3>
              <p>{tournament.description}</p>
            </div>

            <div className="tournament-details__section">
              <h3><i className="fas fa-gavel"></i> Règles</h3>
              <p>{tournament.rules}</p>
            </div>

            <div className="tournament-details__section">
              <h3><i className="fas fa-laptop"></i> Configuration requise</h3>
              <p>{tournament.requirements}</p>
            </div>
          </>
        ) : (
          <div className="tournament-bracket">
            {tournament.bracket.rounds.map((round, roundIndex) => (
              <div key={roundIndex} className="bracket-round">
                <h3 className="bracket-round__title">{round.name}</h3>
                <div className="bracket-matches">
                  {round.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="bracket-match">
                      <div className={`bracket-team ${match.score1 > match.score2 ? 'winner' : ''}`}>
                        <span className="team-name">{match.player1}</span>
                        <span className="team-score">{match.score1 !== null ? match.score1 : '-'}</span>
                      </div>
                      <div className={`bracket-team ${match.score2 > match.score1 ? 'winner' : ''}`}>
                        <span className="team-name">{match.player2}</span>
                        <span className="team-score">{match.score2 !== null ? match.score2 : '-'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          className="btn btn--primary tournament-details__join"
          onClick={handleJoinTournament}
          disabled={tournament.status.toLowerCase() !== 'inscription ouverte'}
        >
          Rejoindre le tournoi
        </button>
      </div>
    </div>
  );
}

export default TournamentDetails;