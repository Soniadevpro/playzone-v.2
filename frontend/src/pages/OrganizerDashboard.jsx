import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function OrganizerDashboard() {
  const { user } = useAuth();

  // Mock data - à remplacer par des données réelles
  const organizerStats = {
    tournamentsCreated: 25,
    activeTournaments: 3,
    totalParticipants: 450,
    totalPrizePool: 5000,
    upcomingTournaments: [
      { name: "League Cup #5", date: "25/03/2024", participants: "24/32", status: "Inscriptions" },
      { name: "Valorant Masters", date: "01/04/2024", participants: "12/16", status: "Inscriptions" }
    ],
    recentTournaments: [
      { name: "CS2 Championship", date: "10/03/2024", participants: "32/32", winner: "TeamPro" },
      { name: "League Cup #4", date: "01/03/2024", participants: "16/16", winner: "DragonSlayers" }
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
            <p className="profile-type">Organisateur</p>
          </div>
        </div>
        <Link to="/create-tournament" className="btn btn--primary">
          <i className="fas fa-plus"></i> Créer un tournoi
        </Link>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__stats">
          <div className="stat-card">
            <i className="fas fa-trophy"></i>
            <div className="stat-info">
              <span className="stat-value">{organizerStats.tournamentsCreated}</span>
              <span className="stat-label">Tournois créés</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-play-circle"></i>
            <div className="stat-info">
              <span className="stat-value">{organizerStats.activeTournaments}</span>
              <span className="stat-label">Tournois actifs</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div className="stat-info">
              <span className="stat-value">{organizerStats.totalParticipants}</span>
              <span className="stat-label">Participants totaux</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-euro-sign"></i>
            <div className="stat-info">
              <span className="stat-value">{organizerStats.totalPrizePool}€</span>
              <span className="stat-label">Prize pool total</span>
            </div>
          </div>
        </div>

        <div className="dashboard__sections">
          <div className="dashboard__section">
            <h2>Tournois à venir</h2>
            <div className="tournaments-list">
              {organizerStats.upcomingTournaments.map((tournament, index) => (
                <div key={index} className="tournament-card">
                  <div className="tournament-info">
                    <h3>{tournament.name}</h3>
                    <span className="tournament-date">{tournament.date}</span>
                  </div>
                  <div className="tournament-details">
                    <span className="tournament-participants">{tournament.participants}</span>
                    <span className="tournament-status">{tournament.status}</span>
                  </div>
                  <div className="tournament-actions">
                    <button className="btn btn--outline btn--sm">
                      <i className="fas fa-edit"></i> Modifier
                    </button>
                    <button className="btn btn--primary btn--sm">
                      <i className="fas fa-cog"></i> Gérer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard__section">
            <h2>Tournois récents</h2>
            <div className="tournaments-list">
              {organizerStats.recentTournaments.map((tournament, index) => (
                <div key={index} className="tournament-card">
                  <div className="tournament-info">
                    <h3>{tournament.name}</h3>
                    <span className="tournament-date">{tournament.date}</span>
                  </div>
                  <div className="tournament-details">
                    <span className="tournament-participants">{tournament.participants}</span>
                    <span className="tournament-winner">
                      <i className="fas fa-crown"></i> {tournament.winner}
                    </span>
                  </div>
                  <div className="tournament-actions">
                    <button className="btn btn--outline btn--sm">
                      <i className="fas fa-chart-bar"></i> Statistiques
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;