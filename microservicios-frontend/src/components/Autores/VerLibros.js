import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Icono para el botón Regresar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const VerLibros = () => {
  const { id } = useParams(); // Obtener el id del autor
  const [libros, setLibros] = useState([]);
  const navigate = useNavigate(); // Para navegar a la lista de autores

  useEffect(() => {
    // Obtener los libros del autor desde la API
    axios.get(`http://localhost:8002/api/libros/autor/${id}`)
      .then(response => setLibros(response.data))
      .catch(error => console.error('Error al obtener los libros del autor:', error));
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Libros del Autor</h2>

      {/* Mostrar mensaje si no hay libros asignados */}
      {libros.length === 0 ? (
        <p>No hay libros asociados a este autor.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Título</th>
              <th>Código</th> {/* Solo mostrar Título y Código */}
            </tr>
          </thead>
          <tbody>
            {libros.map(libro => (
              <tr key={libro.id}>
                <td>{libro.titulo}</td>
                <td>{libro.codigo}</td> {/* Mostrar solo el código */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botón para regresar a la lista de autores */}
      <button 
        className="btn btn-secondary mt-3" 
        onClick={() => navigate('/autores')}
      >
        <FaArrowLeft /> Regresar a la Lista de Autores
      </button>
    </div>
  );
};

export default VerLibros;
