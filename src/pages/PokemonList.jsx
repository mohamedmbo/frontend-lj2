import { useEffect, useMemo, useState } from 'react'
import PokemonCard from '../components/PokemonCard.jsx'

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=24'

function PokemonList({ favorites, teams, onToggleFavorite, onAddToTeam }) {
  const [pokemon, setPokemon] = useState([])
  const [query, setQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('De Pokémon konden niet worden geladen.')
        const data = await response.json()
        setPokemon(data.results.map((item) => {
          const id = item.url.split('/').filter(Boolean).at(-1)
          return {
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }
        }))
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }
    fetchPokemon()
  }, [])

  const visiblePokemon = useMemo(() => {
    const source = showFavorites ? favorites : pokemon
    return source.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }, [favorites, pokemon, query, showFavorites])

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Overzicht</p>
          <h1>Pokémon</h1>
        </div>
        <div className="filters">
          <label>
            <span>Zoeken</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek op naam" />
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={showFavorites} onChange={(event) => setShowFavorites(event.target.checked)} />
            Alleen favorieten
          </label>
        </div>
      </div>

      {status === 'loading' && <p className="status-message">Pokémon laden...</p>}
      {status === 'error' && <p className="status-message error">De Pokémon konden niet worden geladen. Probeer het later opnieuw.</p>}
      {status === 'success' && visiblePokemon.length === 0 && <p className="status-message">Geen Pokémon gevonden.</p>}
      <div className="pokemon-grid">
        {visiblePokemon.map((item) => (
          <PokemonCard
            key={item.name}
            name={item.name}
            image={item.image}
            isFavorite={favorites.some((favorite) => favorite.name === item.name)}
            onToggleFavorite={onToggleFavorite}
            teams={teams}
            onAddToTeam={onAddToTeam}
          />
        ))}
      </div>
    </section>
  )
}

export default PokemonList
