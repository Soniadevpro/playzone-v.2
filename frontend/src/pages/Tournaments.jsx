import { useState } from 'react';
import TournamentCard from '../components/TournamentCard';

function Tournaments() {
  const [filter, setFilter] = useState('all');
  
  const tournaments = [
    {
      game: "League of Legends",
      date: "20 Avril 2024",
      players: "16/32",
      status: "Inscription ouverte"
    },
    {
      game: "Valorant",
      date: "25 Avril 2024",
      players: "8/20",
      status: "Inscription ouverte"
    },
    {
      game: "Counter-Strike 2",
      date: "1 Mai 2024",
      players: "12/24",
      status: "Inscription ouverte"
    },
    {
      game: "Rocket League",
      date: "5 Mai 2024",
      players: "6/16",
      status: "Inscription ouverte"
    }
  ];

  return (
    <div className="tournaments-page">
      <div className="tournaments-page__header">
        <div className="tournaments-page__title-wrapper">
          <h1>Tous les tournois</h1>
          <p>Découvrez et rejoignez les tournois qui vous intéressent</p>
        </div>
        <div className="tournaments-page__filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <i className="fas fa-globe"></i>
            Tous
          </button>
          <button 
            className={`filter-btn ${filter === 'open' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('open')}
          >
            <i className="fas fa-door-open"></i>
            Inscriptions ouvertes
          </button>
          <button 
            className={`filter-btn ${filter === 'upcoming' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            <i className="fas fa-calendar-alt"></i>
            À venir
          </button>
        </div>
      </div>
      
      <div className="tournaments__grid">
        {tournaments.map((tournament, index) => (
          <TournamentCard key={index} {...tournament} />
        ))}
      </div>
    </div>
  );
}

export default Tournaments