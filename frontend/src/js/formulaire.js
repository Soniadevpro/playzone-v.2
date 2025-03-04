/* validation du formulaire côté navigateur */

const handleSubmit = (e) => {
  e.preventDefault();

  // Validation du formulaire
  if (!tournamentData.game || !tournamentData.date || !tournamentData.maxPlayers || !tournamentData.entryFee || !tournamentData.prize) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  if (tournamentData.location === "local" && (!tournamentData.address || !tournamentData.city)) {
    alert("Veuillez renseigner l'adresse et la ville pour un tournoi local.");
    return;
  }

  // TODO: Implémenter la création du tournoi
  console.log("Données du tournoi:", tournamentData);
};

if (!user || user.userType !== "organizer") {
  return (
    <div className="create-tournament">
      <h1 className="create-tournament__title">Accès Restreint</h1>
      <div className="create-tournament__message">
        <p>Vous devez être connecté en tant qu'organisateur pour créer un tournoi.</p>
        <button className="btn btn--primary" onClick={() => navigate("/login")} style={{ marginTop: "20px" }}>
          Se connecter
        </button>
      </div>
    </div>
  );
}
