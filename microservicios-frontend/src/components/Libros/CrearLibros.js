import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Icono para el botón Regresar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const CrearLibros = () => {
  const [titulo, setTitulo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [error, setError] = useState(null);  // Estado para manejar errores
  const [errorTitulo, setErrorTitulo] = useState(''); // Error para el título
  const [errorCodigo, setErrorCodigo] = useState(''); // Error para el código
  const [errorFecha, setErrorFecha] = useState(''); // Error para la fecha
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const validateForm = () => {
    let isValid = true;
    setErrorTitulo('');
    setErrorCodigo('');
    setErrorFecha('');

    if (!titulo || titulo.trim() === '') {
      setErrorTitulo('El título es obligatorio');
      isValid = false;
    }
    if (!codigo || codigo.trim() === '') {
      setErrorCodigo('El código es obligatorio');
      isValid = false;
    }
    if (!fechaPublicacion) {
      setErrorFecha('La fecha de publicación es obligatoria');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Si la validación falla, no enviamos el formulario
    }

    const nuevoLibro = { titulo, codigo, fechaPublicacion };
    axios.post('http://localhost:8002/api/libros', nuevoLibro)
      .then(response => {
        navigate('/libros'); // Redirige a la lista de libros
      })
      .catch(error => {
        setError('Error al crear el libro');
        console.error('Error al crear el libro:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Libro</h2>

      {error && <p className="text-danger">{error}</p>} {/* Mostrar error si existe */}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            className={`form-control ${errorTitulo ? 'is-invalid' : ''}`} 
            required 
          />
          {errorTitulo && <div className="invalid-feedback">{errorTitulo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Código:</label>
          <input 
            type="text" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            className={`form-control ${errorCodigo ? 'is-invalid' : ''}`} 
            required 
          />
          {errorCodigo && <div className="invalid-feedback">{errorCodigo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Publicación:</label>
          <input 
            type="date" 
            value={fechaPublicacion} 
            onChange={(e) => setFechaPublicacion(e.target.value)} 
            className={`form-control ${errorFecha ? 'is-invalid' : ''}`} 
            required 
          />
          {errorFecha && <div className="invalid-feedback">{errorFecha}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>

      <button 
        className="btn btn-secondary mt-3" 
        onClick={() => navigate('/libros')}
      >
        <FaArrowLeft /> Regresar a la Lista
      </button>
    </div>
  );
};

export default CrearLibros;
