import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PokemonDetail({ favorites, onToggleFavorite }) {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPokemon() {
      setPokemon(null)
      setError(false)
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (!response.ok) throw new Error('Niet gevonden')
        setPokemon(await response.json())
      } catch {
        setError(true)
      }
    }
    fetchPokemon()
  }, [name])

  if (error) {
    return <section className="page-section"><p className="status-message error">Deze Pokémon kon niet worden geladen.</p></section>
  }
  if (!pokemon) {
    return <section className="page-section"><p className="status-message">Details laden...</p></section>
  }

  const summary = { name: pokemon.name, image: pokemon.sprites.other['official-artwork'].front_default }
  const isFavorite = favorites.some((item) => item.name === pokemon.name)

  return (
    <section className="page-section detail-page">
      <Link className="back-link" to="/pokemon">← Terug naar het overzicht</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={summary.image} alt={pokemon.name} /></div>
        <div>
          <p className="eyebrow">Pokémon #{pokemon.id}</p>
          <h1>{pokemon.name}</h1>
          <button className="button primary" type="button" onClick={() => onToggleFavorite(summary)}>
            {isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
          </button>
          <dl className="details-list">
            <div><dt>Type</dt><dd>{pokemon.types.map((item) => item.type.name).join(', ')}</dd></div>
            <div><dt>Lengte</dt><dd>{pokemon.height / 10} m</dd></div>
            <div><dt>Gewicht</dt><dd>{pokemon.weight / 10} kg</dd></div>
            <div><dt>Vaardigheden</dt><dd>{pokemon.abilities.map((item) => item.ability.name).join(', ')}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default PokemonDetail
