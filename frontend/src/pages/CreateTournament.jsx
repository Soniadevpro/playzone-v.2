import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';


function CreateTournament() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tournamentData, setTournamentData] = useState({
    game: '',
    date: '',
    maxPlayers: '',
    description: '',
    entryFee: '',
    prize: '',
    location: 'online', // 'online' ou 'local'
    address: '', // Pour les tournois en local
    city: '', // Pour les tournois en local
    platform: '', // Pour les tournois en ligne (Discord, Steam, etc.)
    requirements: '' // Configuration requise ou matériel nécessaire
  });

  // Vérifier si l'utilisateur est connecté et est un organisateur
  if (!user || user.userType !== 'organizer') {
    return (
      <div className="create-tournament">
        <h1 className="create-tournament__title">Accès Restreint</h1>
        <div className="create-tournament__message">
          <p>Vous devez être connecté en tant quorganisateur pour créer un tournoi.</p>
          <button 
            className="btn btn--primary" 
            onClick={() => navigate('/login')}
            style={{ marginTop: '20px' }}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la création du tournoi
    console.log('Données du tournoi:', tournamentData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="create-tournament">
      <h1 className="create-tournament__title">Créer un tournoi</h1>
      <form className="tournament-form" onSubmit={handleSubmit}>
        <div className="tournament-form__group">
          <label htmlFor="game">Jeu</label>
          <input
            type="text"
            id="game"
            name="game"
            value={tournamentData.game}
            onChange={handleChange}
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="location">Type de tournoi</label>
          <select
            id="location"
            name="location"
            value={tournamentData.location}
            onChange={handleChange}
            required
          >
            <option value="online">En ligne</option>
            <option value="local">En local</option>
          </select>
        </div>

        {tournamentData.location === 'online' && (
          <div className="tournament-form__group">
            <label htmlFor="platform">Plateforme de jeu</label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={tournamentData.platform}
              onChange={handleChange}
              placeholder="Ex: Discord, Steam, Battle.net"
              required
            />
          </div>
        )}

        {tournamentData.location === 'local' && (
          <>
            <div className="tournament-form__group">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={tournamentData.address}
                onChange={handleChange}
                placeholder="Numéro et nom de rue"
                required
              />
            </div>
            <div className="tournament-form__group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={tournamentData.city}
                onChange={handleChange}
                placeholder="Ville"
                required
              />
            </div>
          </>
        )}

        <div className="tournament-form__group">
          <label htmlFor="date">Date du tournoi</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={tournamentData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="maxPlayers">Nombre maximum de joueurs</label>
          <input
            type="number"
            id="maxPlayers"
            name="maxPlayers"
            value={tournamentData.maxPlayers}
            onChange={handleChange}
            min="2"
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="entryFee">Prix dentrée (€)</label>
          <input
            type="number"
            id="entryFee"
            name="entryFee"
            value={tournamentData.entryFee}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="prize">Récompense pour le gagnant (€)</label>
          <input
            type="number"
            id="prize"
            name="prize"
            value={tournamentData.prize}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="requirements">Configuration requise / Matériel nécessaire</label>
          <textarea
            id="requirements"
            name="requirements"
            value={tournamentData.requirements}
            onChange={handleChange}
            rows="3"
            placeholder={tournamentData.location === 'online' 
              ? "Ex: Configuration PC minimale, connexion internet requise..."
              : "Ex: Apporter sa manette, son casque..."}
            required
          />
        </div>

        <div className="tournament-form__group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={tournamentData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn--primary">
          Créer le tournoi
        </button>
      </form>
    </div>
  );
}
CreateTournament.propTypes = {
    user: PropTypes.shape({
      userType: PropTypes.string
    })
  };
export default CreateTournament;