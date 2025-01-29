import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CrearAutores = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!nombre) errors.nombre = 'El nombre es obligatorio.';
    if (!apellido) errors.apellido = 'El apellido es obligatorio.';
    if (!email) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El email debe tener un formato válido.';
    }
    if (!telefono) {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(telefono)) {
      errors.telefono = 'El teléfono debe tener exactamente 10 dígitos.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const nuevoAutor = { nombre, apellido, email, telefono };
      axios.post('http://localhost:8001/api/autores', nuevoAutor)
        .then(() => {
          navigate('/autores');
        })
        .catch(error => {
          setError('Error al crear el autor');
          console.error('Error al crear el autor:', error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Autor</h2>

      {error && <p className="text-danger">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            required
          />
          {formErrors.nombre && <p className="text-danger">{formErrors.nombre}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="form-control"
            required
          />
          {formErrors.apellido && <p className="text-danger">{formErrors.apellido}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
          {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="form-control"
            required
          />
          {formErrors.telefono && <p className="text-danger">{formErrors.telefono}</p>}
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Crear Autor
        </button>
      </form>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/autores')}
      >
        <FaArrowLeft /> Regresar a la Lista
      </button>
    </div>
  );
};

export default CrearAutores;
