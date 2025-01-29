import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ListarAutores from './components/Autores/ListarAutores';
import CrearAutores from './components/Autores/CrearAutores';
import EditarAutores from './components/Autores/EditarAutores';
import ListarLibros from './components/Libros/ListarLibros';
import CrearLibros from './components/Libros/CrearLibros';
import EditarLibros from './components/Libros/EditarLibros';
import AnadirAutorALibro from './components/Libros/AnadirAutorALibro';
import VerAutores from './components/Libros/VerAutores';  // Asegúrate de importar el componente VerAutores
import VerLibros from './components/Autores/VerLibros';  // Asegúrate de importar el componente VerLibros
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autores" element={<ListarAutores />} />
          <Route path="/autores/crear" element={<CrearAutores />} />
          <Route path="/autores/editar/:id" element={<EditarAutores />} />
          <Route path="/libros" element={<ListarLibros />} />
          <Route path="/libros/crear" element={<CrearLibros />} />
          <Route path="/libros/:id/asignar-autores" element={<AnadirAutorALibro />} />
          <Route path="/libros/editar/:id" element={<EditarLibros />} />
          <Route path="/ver-usuarios" element={<VerAutores />} /> {/* Agregar la ruta para VerAutores */}
           <Route path="/ver-libros/:id" element={<VerLibros />} /> {/* Agregar la ruta para VerLibros */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
