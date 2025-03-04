import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function PlayerDashboard() {
  const { user } = useAuth();

  // Mock data - à remplacer par des données réelles
  const playerStats = {
    tournamentsParticipated: 15,
    tournamentsWon: 3,
    totalPrizeWon: 750,
    winRate: 65,
    favoriteGame: "League of Legends",
    rank: "Gold",
    recentMatches: [
      { game: "League of Legends", result: "Victoire", date: "15/03/2024", position: 1 },
      { game: "Valorant", result: "Défaite", date: "10/03/2024", position: 4 },
      { game: "CS2", result: "Victoire", date: "05/03/2024", position: 1 }
    ]
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__profile">
          <div className="profile-image">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
              <div className="profile-image__placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
            <button className="profile-image__edit">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-type">Joueur</p>
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__stats">
          <div className="stat-card">
            <i className="fas fa-trophy"></i>
            <div className="stat-info">
              <span className="stat-value">{playerStats.tournamentsWon}</span>
              <span className="stat-label">Tournois gagnés</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-gamepad"></i>
            <div className="stat-info">
              <span className="stat-value">{playerStats.tournamentsParticipated}</span>
              <span className="stat-label">Tournois participés</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-euro-sign"></i>
            <div className="stat-info">
              <span className="stat-value">{playerStats.totalPrizeWon}€</span>
              <span className="stat-label">Gains totaux</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-chart-line"></i>
            <div className="stat-info">
              <span className="stat-value">{playerStats.winRate}%</span>
              <span className="stat-label">Taux de victoire</span>
            </div>
          </div>
        </div>

        <div className="dashboard__sections">
          <div className="dashboard__section">
            <h2>Historique des matchs récents</h2>
            <div className="matches-list">
              {playerStats.recentMatches.map((match, index) => (
                <div key={index} className="match-card">
                  <div className="match-info">
                    <span className="match-game">{match.game}</span>
                    <span className={`match-result ${match.result.toLowerCase()}`}>
                      {match.result}
                    </span>
                  </div>
                  <div className="match-details">
                    <span className="match-date">{match.date}</span>
                    <span className="match-position">#{match.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard__section">
            <h2>Profil du joueur</h2>
            <div className="profile-details">
              <div className="profile-detail">
                <span className="detail-label">Jeu favori</span>
                <span className="detail-value">{playerStats.favoriteGame}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-label">Rang</span>
                <span className="detail-value">{playerStats.rank}</span>
              </div>
              <button className="btn btn--outline">
                <i className="fas fa-edit"></i> Modifier le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDashboard;