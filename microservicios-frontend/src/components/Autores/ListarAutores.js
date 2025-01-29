import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaPlusCircle } from 'react-icons/fa'; // Iconos de eliminar, editar y agregar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const ListarAutores = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/autores')
      .then(response => setAutores(response.data))
      .catch(error => console.error('Error al obtener autores:', error));
  }, []);

  const handleEliminar = (id) => {
    // Confirmación antes de eliminar
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este autor?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8001/api/autores/${id}`)
        .then(() => {
          setAutores(autores.filter(autor => autor.id !== id));
        })
        .catch(error => console.error('Error al eliminar autor:', error));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Autores</h2>

      {/* Tabla de autores */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map(autor => (
            <tr key={autor.id}>
              <td>{autor.nombre}</td>
              <td>{autor.apellido}</td>
              <td>{autor.email}</td>
              <td>{autor.telefono}</td>
              <td>
                <button 
                  className="btn btn-danger mx-2" // Agregado margen horizontal
                  onClick={() => handleEliminar(autor.id)}
                >
                  <FaTrashAlt /> Eliminar
                </button>
                {/* Ruta para editar autor */}
                <Link to={`/autores/editar/${autor.id}`}>
                  <button className="btn btn-warning mx-2">
                    <FaEdit /> Editar
                  </button>
                </Link>
                {/* Ruta para ver los libros del autor */}
                <Link to={`/ver-libros/${autor.id}`}>
                  <button className="btn btn-info mx-2">
                    Ver Libros
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para crear nuevo autor al final */}
      <Link to="/autores/crear" className="btn btn-success mt-3">
        <FaPlusCircle /> Crear Autor
      </Link>
    </div>
  );
};

export default ListarAutores;
