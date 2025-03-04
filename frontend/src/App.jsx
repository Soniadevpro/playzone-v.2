import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTournament from './pages/CreateTournament';
import TournamentDetails from './pages/TournamentDetails';
import Tournaments from './pages/Tournaments';
import PlayerDashboard from './pages/PlayerDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import { AuthProvider } from './context/AuthContext';
import './styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/create-tournament" element={<CreateTournament />} />
              <Route path="/tournament/:id" element={<TournamentDetails />} />
              <Route path="/dashboard/player" element={<PlayerDashboard />} />
              <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
