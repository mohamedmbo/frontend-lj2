import PokemonCard from '../components/PokemonCard.jsx'

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">Bewaarde selectie</p><h1>Favorieten</h1></div>
      </div>
      {favorites.length === 0 ? (
        <p className="status-message">Je hebt nog geen favoriete Pokémon.</p>
      ) : (
        <div className="pokemon-grid">
          {favorites.map((item) => (
            <PokemonCard key={item.name} name={item.name} image={item.image} isFavorite onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites
