import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Importamos el ícono de "Home"
import './Navbar.css'; // Asegúrate de tener un archivo de estilos CSS para el navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="home-link">
          <Link to="/">
            <FaHome className="home-icon" /> Inicio
          </Link>
        </li>
        <li><Link to="/libros">Libros</Link></li>
        <li><Link to="/autores">Autores</Link></li>
        <li><Link to="/ver-usuarios">Ver Autores por libro</Link></li> {/* Botón para ver autores por libro */}
      </ul>
    </nav>
  );
};

export default Navbar;
