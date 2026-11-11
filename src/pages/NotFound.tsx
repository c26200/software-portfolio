import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-text">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="not-found-link">
        ← Volver al inicio
      </Link>
    </section>
  );
}
