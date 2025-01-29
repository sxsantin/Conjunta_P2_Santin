import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Icono para el botón Regresar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const EditarLibros = () => {
  const [libro, setLibro] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8002/api/libros/${id}`)
        .then(response => {
          setLibro(response.data);
          setTitulo(response.data.titulo);
          setCodigo(response.data.codigo);
          setFechaPublicacion(response.data.fechaPublicacion);
        })
        .catch(error => {
          setError('Error al obtener el libro');
          console.error('Error al obtener el libro:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!titulo || !codigo || !fechaPublicacion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const libroActualizado = { titulo, codigo, fechaPublicacion };
    axios.put(`http://localhost:8002/api/libros/${id}`, libroActualizado)
      .then(() => {
        navigate('/libros'); // Redirige a la lista de libros después de la actualización
      })
      .catch(error => {
        setError('Error al actualizar el libro.');
        console.error('Error al actualizar el libro:', error);
      });
  };

  if (!libro) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Libro</h2>

      {/* Mostrar mensaje de error si existe */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input 
            type="text" 
            className="form-control" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Código:</label>
          <input 
            type="text" 
            className="form-control" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Publicación:</label>
          <input 
            type="date" 
            className="form-control" 
            value={fechaPublicacion} 
            onChange={(e) => setFechaPublicacion(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>

      {/* Botón para regresar */}
      <button onClick={() => navigate('/libros')} className="btn btn-secondary mt-3">
        <FaArrowLeft /> Regresar
      </button>
    </div>
  );
};

export default EditarLibros;
