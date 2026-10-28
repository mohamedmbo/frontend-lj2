import { Link } from 'react-router-dom'

function NotFound() {
  return <section className="page-section empty-state"><h1>Pagina niet gevonden</h1><Link className="button primary" to="/">Terug naar home</Link></section>
}

export default NotFound
