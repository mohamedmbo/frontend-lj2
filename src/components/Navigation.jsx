import { NavLink } from 'react-router-dom'

function Navigation({ favoriteCount, teamCount }) {
  return (
    <nav aria-label="Hoofdnavigatie">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pokemon">Pokémon</NavLink>
      <NavLink to="/favorieten">Favorieten ({favoriteCount})</NavLink>
      <NavLink to="/teams">Teams ({teamCount})</NavLink>
    </nav>
  )
}

export default Navigation
