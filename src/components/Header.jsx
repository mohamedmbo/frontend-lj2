import { Link } from 'react-router-dom'
import Navigation from './Navigation.jsx'

function Header({ favoriteCount, teamCount }) {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link className="brand" to="/" aria-label="Naar home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Pokémon Team Manager</span>
        </Link>
        <Navigation favoriteCount={favoriteCount} teamCount={teamCount} />
      </div>
    </header>
  )
}

export default Header
