import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Icono para el botón Regresar
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const AnadirAutorALibro = () => {
  const [autorId, setAutorId] = useState('');
  const [autores, setAutores] = useState([]);
  const [error, setError] = useState(''); // Estado para manejar errores
  const { id } = useParams(); // Usar useParams para obtener el id del libro
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener todos los autores disponibles
    axios.get('http://localhost:8001/api/autores')
      .then(response => {
        const autorOptions = response.data.map(autor => ({
          value: autor.id,
          label: `${autor.nombre} ${autor.apellido}`
        }));
        setAutores(autorOptions);
      })
      .catch(error => {
        console.error('Error al obtener los autores:', error);
        setError('Hubo un problema al obtener los autores.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!autorId) {
      setError('Por favor, selecciona un autor.');
      return;
    }

    const autor = { id: autorId };
    axios.post(`http://localhost:8002/api/libros/${id}/autores`, autor)
      .then(response => {
        alert('Autor agregado correctamente');
        navigate('/libros'); // Redirigir al menú de libros después de agregar el autor
      })
      .catch(error => {
        console.error('Error al agregar el autor:', error);
        setError('El autor ya esta dentro de este libro.');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Agregar Autor al Libro</h2>

      {/* Mostrar error si hay algún problema */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Selecciona un Autor:</label>
          <Select
            options={autores}
            onChange={(selectedOption) => setAutorId(selectedOption ? selectedOption.value : '')}
            isSearchable
            placeholder="Busca un autor..."
            required
            className="react-select-container"
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
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

export default AnadirAutorALibro;
