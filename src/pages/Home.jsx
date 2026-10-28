import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero page-section">
      <div>
        <p className="eyebrow">Pokémon Team Manager</p>
        <h1>Bouw en beheer jouw Pokémonteams</h1>
        <p>Bekijk Pokémon, bewaar favorieten en stel teams samen voor jouw volgende avontuur.</p>
        <div className="hero-actions">
          <Link className="button primary" to="/pokemon">Bekijk Pokémon</Link>
          <Link className="button secondary" to="/teams">Beheer teams</Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit" aria-hidden="true" />
        <img
          className="hero-pokemon"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
        />
        <div className="hero-chip favorite-chip"><span>♥</span><strong>Favorieten</strong></div>
        <div className="hero-chip team-chip"><span>3</span><strong>Teams</strong></div>
      </div>
    </section>
  )
}

export default Home
