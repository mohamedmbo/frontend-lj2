import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Favorites from './pages/Favorites.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'
import PokemonList from './pages/PokemonList.jsx'
import Teams from './pages/Teams.jsx'

function App() {
  const [favorites, setFavorites] = useState([])
  const [teams, setTeams] = useState([])

  function toggleFavorite(pokemon) {
    setFavorites((current) =>
      current.some((item) => item.name === pokemon.name)
        ? current.filter((item) => item.name !== pokemon.name)
        : [...current, pokemon],
    )
  }

  function createTeam(name) {
    const cleanName = name.trim()
    if (!cleanName) return false
    setTeams((current) => [...current, { id: crypto.randomUUID(), name: cleanName, pokemon: [] }])
    return true
  }

  function deleteTeam(teamId) {
    setTeams((current) => current.filter((team) => team.id !== teamId))
  }

  function addPokemonToTeam(teamId, pokemon) {
    setTeams((current) =>
      current.map((team) => {
        if (team.id !== teamId || team.pokemon.some((item) => item.name === pokemon.name)) return team
        return { ...team, pokemon: [...team.pokemon, pokemon] }
      }),
    )
  }

  function removePokemonFromTeam(teamId, pokemonName) {
    setTeams((current) =>
      current.map((team) =>
        team.id === teamId
          ? { ...team, pokemon: team.pokemon.filter((item) => item.name !== pokemonName) }
          : team,
      ),
    )
  }

  return (
    <div className="app-shell">
      <Header favoriteCount={favorites.length} teamCount={teams.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon"
            element={
              <PokemonList
                favorites={favorites}
                teams={teams}
                onToggleFavorite={toggleFavorite}
                onAddToTeam={addPokemonToTeam}
              />
            }
          />
          <Route path="/pokemon/:name" element={<PokemonDetail favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route path="/favorieten" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route
            path="/teams"
            element={
              <Teams
                teams={teams}
                onCreateTeam={createTeam}
                onDeleteTeam={deleteTeam}
                onRemovePokemon={removePokemonFromTeam}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
