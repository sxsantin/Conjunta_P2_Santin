import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Importamos react-select
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const VerAutores = () => {
  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [selectedLibro, setSelectedLibro] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores

  // Obtener los libros disponibles
  useEffect(() => {
    axios.get('http://localhost:8002/api/libros')
      .then(response => {
        const librosOptions = response.data.map(libro => ({
          value: libro.id,
          label: libro.titulo
        }));
        setLibros(librosOptions);
      })
      .catch(error => console.error('Error al obtener los libros:', error));
  }, []);

  // Obtener los autores del libro seleccionado solo cuando el libro cambia
  useEffect(() => {
    if (!selectedLibro) return; // No hacer nada si no hay libro seleccionado

    setAutores([]); // Limpiar los autores al cambiar de libro
    setError(''); // Limpiar el error

    axios.get(`http://localhost:8002/api/libros/${selectedLibro}/autores`)
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los autores:', error);
        setError('No tiene autores asignados.');
      });
  }, [selectedLibro]); // Solo se ejecuta cuando `selectedLibro` cambia

  // Eliminar un autor del libro
  const eliminarAutor = (autorId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este autor?')) {
      axios.delete(`http://localhost:8002/api/libros/${selectedLibro}/autores/${autorId}`)
        .then(() => {
          setAutores(prevAutores => prevAutores.filter(autor => autor.id !== autorId));
        })
        .catch(error => {
          console.error('Error al eliminar el autor:', error);
          setError('Hubo un problema al eliminar el autor.');
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ver Autores por Libro</h2>

      {/* Mostrar error si no se ha seleccionado un libro */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Combo select de libros con búsqueda */}
      <div className="mb-3">
        <label htmlFor="libroSelect" className="form-label">Selecciona un libro:</label>
        <Select
          id="libroSelect"
          options={libros}
          value={libros.find(libro => libro.value === selectedLibro)} // Mantener el valor seleccionado
          onChange={(selectedOption) => setSelectedLibro(selectedOption ? selectedOption.value : '')}
          placeholder="Escribe para buscar un libro..."
          className="mb-3"
        />
      </div>

      {/* Mostrar autores si hay */}
      {selectedLibro && (
        <div>
          <h3>Autores del Libro</h3>
          {autores.length > 0 ? (
            <ul className="list-group">
              {autores.map(autor => (
                <li key={autor.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {autor.nombre} {autor.apellido}
                  <button 
                    onClick={() => eliminarAutor(autor.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Es necesario agregar autores.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerAutores;
