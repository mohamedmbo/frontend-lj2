import { useState } from 'react'
import { Link } from 'react-router-dom'

function Teams({ teams, onCreateTeam, onDeleteTeam, onRemovePokemon }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (onCreateTeam(name)) setName('')
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">Teambeheer</p><h1>Teams</h1></div>
        <form className="create-team-form" onSubmit={handleSubmit}>
          <label htmlFor="team-name">Teamnaam</label>
          <div><input id="team-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Bijvoorbeeld Team Kantoorpikachu" /><button className="button primary" type="submit">Team maken</button></div>
        </form>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <h2>Nog geen teams</h2>
          <p>Maak eerst een team. Daarna kun je Pokémon vanuit het overzicht toevoegen.</p>
          <Link className="button secondary" to="/pokemon">Naar Pokémon</Link>
        </div>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <article className="team-card" key={team.id}>
              <div className="team-card-heading">
                <div><p className="eyebrow">{team.pokemon.length} Pokémon</p><h2>{team.name}</h2></div>
                <button className="danger-button" type="button" onClick={() => onDeleteTeam(team.id)}>Verwijderen</button>
              </div>
              {team.pokemon.length === 0 ? <p>Dit team is nog leeg.</p> : (
                <ul className="team-pokemon-list">
                  {team.pokemon.map((pokemon) => (
                    <li key={pokemon.name}>
                      <Link to={`/pokemon/${pokemon.name}`}><img src={pokemon.image} alt="" /><span>{pokemon.name}</span></Link>
                      <button type="button" onClick={() => onRemovePokemon(team.id, pokemon.name)} aria-label={`${pokemon.name} uit ${team.name} verwijderen`}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
