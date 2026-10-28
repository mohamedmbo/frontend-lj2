import { Link } from 'react-router-dom'

function PokemonCard({ name, image, isFavorite, onToggleFavorite, teams = [], onAddToTeam }) {
  function handleAdd(event) {
    const teamId = event.currentTarget.form.elements.team.value
    if (teamId) onAddToTeam(teamId, { name, image })
  }

  return (
    <article className="pokemon-card">
      <button
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        type="button"
        onClick={() => onToggleFavorite({ name, image })}
        aria-label={isFavorite ? `${name} uit favorieten verwijderen` : `${name} als favoriet opslaan`}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <Link to={`/pokemon/${name}`} className="pokemon-link">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <span>Bekijk details</span>
      </Link>
      {teams.length > 0 && onAddToTeam ? (
        <form className="team-picker" onSubmit={(event) => event.preventDefault()}>
          <select name="team" aria-label={`Kies een team voor ${name}`} defaultValue="">
            <option value="" disabled>Kies een team</option>
            {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <button type="button" onClick={handleAdd}>Toevoegen</button>
        </form>
      ) : onAddToTeam ? (
        <div className="team-picker-empty">
          <Link to="/teams">Maak een team</Link>
        </div>
      ) : null}
    </article>
  )
}

export default PokemonCard
