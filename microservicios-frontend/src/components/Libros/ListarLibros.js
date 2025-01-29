import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaPlusCircle } from 'react-icons/fa'; // Iconos de eliminar, editar y agregar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const ListarLibros = () => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8002/api/libros')
      .then(response => setLibros(response.data))
      .catch(error => console.error('Error al obtener los libros:', error));
  }, []);

const eliminarLibro = (id) => {
  // Confirmación antes de eliminar
  const confirmDelete = window.confirm('¿Estás seguro de eliminar este libro?');
  if (confirmDelete) {
    axios.delete(`http://localhost:8002/api/libros/${id}`)
      .then(() => {
        setLibros(libros.filter(libro => libro.id !== id));
        navigate('/libros'); // Redirigir después de eliminar el libro
      })
      .catch(error => {
        setError('Este libro contiene autores, no se puede eliminar.');
      });
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Libros</h2>

      {/* Mostrar error si el libro tiene autores asociados */}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Título</th>
            <th>Código</th>
            <th>Fecha de Publicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.codigo}</td>
              <td>{libro.fechaPublicacion}</td>
              <td>
                <button 
                  className="btn btn-danger mx-2" // Agregado margen horizontal
                  onClick={() => eliminarLibro(libro.id)}
                >
                  <FaTrashAlt /> Eliminar
                </button>
                <Link to={`/libros/editar/${libro.id}`}>
                  <button className="btn btn-warning mx-2">
                    <FaEdit /> Editar
                  </button>
                </Link>
                <Link to={`/libros/${libro.id}/asignar-autores`}>
                  <button className="btn btn-info mx-2">
                    Asignar Autores
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/libros/crear">
        <button className="btn btn-success mt-3">
          <FaPlusCircle /> Crear Libro
        </button>
      </Link>
    </div>
  );
};

export default ListarLibros;
