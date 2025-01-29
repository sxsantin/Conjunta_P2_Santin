import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarAutores = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState({ nombre: '', apellido: '', email: '', telefono: '' });
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8001/api/autores/${id}`)
      .then(response => setAutor(response.data))
      .catch(error => {
        setError('Error al obtener el autor');
        console.error('Error al obtener el autor:', error);
      });
  }, [id]);

  const validateForm = () => {
    const errors = {};
    if (!autor.nombre) errors.nombre = 'El nombre es obligatorio.';
    if (!autor.apellido) errors.apellido = 'El apellido es obligatorio.';
    if (!autor.email) {
      errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(autor.email)) {
      errors.email = 'El email debe tener un formato válido.';
    }
    if (!autor.telefono) {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(autor.telefono)) {
      errors.telefono = 'El teléfono debe tener exactamente 10 dígitos.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.put(`http://localhost:8001/api/autores/${id}`, autor)
        .then(() => {
          navigate('/autores');
        })
        .catch(error => {
          setError('Error al actualizar el autor');
          console.error('Error al actualizar autor:', error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Autor</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={autor.nombre}
            onChange={handleChange}
            required
          />
          {formErrors.nombre && <p className="text-danger">{formErrors.nombre}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={autor.apellido}
            onChange={handleChange}
            required
          />
          {formErrors.apellido && <p className="text-danger">{formErrors.apellido}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={autor.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={autor.telefono}
            onChange={handleChange}
            required
          />
          {formErrors.telefono && <p className="text-danger">{formErrors.telefono}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar Autor
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

export default EditarAutores;
