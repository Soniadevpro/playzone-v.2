import { Link } from 'react-router-dom';
import TournamentCard from '../components/TournamentCard';
import { useState, useEffect } from 'react';

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    }
  ];

  const testimonials = [
    {
      quote: "Une plateforme incroyable pour organiser des tournois !",
      author: "Thomas D.",
      role: "Organisateur",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
    },
    {
      quote: "J'ai rencontré des joueurs fantastiques grâce à PlayZone.",
      author: "Marie L.",
      role: "Joueuse",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    }
  ];

  const popularGames = [
    {
      name: "League of Legends",
      image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
      activeTournaments: 12
    },
    {
      name: "Valorant",
      image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png",
      activeTournaments: 8
    },
    {
      name: "Counter-Strike 2",
      image: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg",
      activeTournaments: 10
    }
  ];

  const faqItems = [
    {
      question: "Comment participer à un tournoi ?",
      answer: "Inscrivez-vous sur la plateforme, choisissez un tournoi qui vous intéresse et cliquez sur 'Participer'."
    },
    {
      question: "Comment créer un tournoi ?",
      answer: "Connectez-vous en tant qu'organisateur, cliquez sur 'Créer un tournoi' et suivez les étapes."
    },
    {
      question: "Les tournois sont-ils gratuits ?",
      answer: "Cela dépend du tournoi. Certains sont gratuits, d'autres peuvent avoir des frais d'inscription."
    }
  ];

  return (
    <div>
      <section className="hero">
        <h1 className="hero__title">Bienvenue sur PlayZone</h1>
        <p className="hero__subtitle">Créez et participez à des tournois de jeux vidéo</p>
        <div className="hero__buttons">
          <Link to="/create-tournament" className="btn btn--primary">
            Créer un tournoi
          </Link>
          <Link to="/tournaments" className="btn btn--outline">
            Rejoindre un tournoi
          </Link>
        </div>
      </section>

      <section className="upcoming-tournaments">
        <div className="container">
          <h2>Prochain tournoi</h2>
          <div className="tournament-countdown">
            <div className="countdown-item">
              <span className="time">{timeLeft.days}</span>
              <span className="label">Jours</span>
            </div>
            <div className="countdown-item">
              <span className="time">{timeLeft.hours}</span>
              <span className="label">Heures</span>
            </div>
            <div className="countdown-item">
              <span className="time">{timeLeft.minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="time">{timeLeft.seconds}</span>
              <span className="label">Secondes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1,234</span>
              <span className="stat-label">Joueurs inscrits</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">56</span>
              <span className="stat-label">Tournois organisés</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">€15,000</span>
              <span className="stat-label">Prix distribués</span>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-games">
        <div className="container">
          <h2>Jeux populaires</h2>
          <div className="games-grid">
            {popularGames.map((game, index) => (
              <div key={index} className="game-card">
                <div className="game-card__image" style={{ backgroundImage: `url(${game.image})` }}></div>
                <div className="game-card__content">
                  <h3>{game.name}</h3>
                  <p>{game.activeTournaments} tournois actifs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tournaments">
        <div className="container">
          <h2 className="tournaments__title">Tournois en cours</h2>
          <div className="tournaments__grid">
            {tournaments.map((tournament, index) => (
              <TournamentCard key={index} {...tournament} />
            ))}
          </div>
          <div className="tournaments__more">
            <Link to="/tournaments" className="btn btn--outline">
              Voir tous les tournois
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>Ils nous font confiance</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="quote">{testimonial.quote}</p>
                <div className="author">
                  <img src={testimonial.avatar} alt={testimonial.author} />
                  <div className="author-info">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <h2>Questions fréquentes</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;