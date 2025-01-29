import axios from 'axios';

const API_URL = 'http://localhost:8002/api/libros';

export const getLibros = () => axios.get(API_URL);
export const createLibro = (libro) => axios.post(API_URL, libro);
export const deleteLibro = (id) => axios.delete(`${API_URL}/${id}`);
export const getLibroById = (id) => axios.get(`${API_URL}/${id}`);
export const updateLibro = (id, libro) => axios.put(`${API_URL}/${id}`, libro);
export const getLibrosByAutor = (autorId) => axios.get(`${API_URL}/autor/${autorId}`);
export const addAutorToLibro = (libroId, autor) => axios.post(`${API_URL}/${libroId}/autores`, autor);
export const removeAutorFromLibro = (libroId, autorId) => axios.delete(`${API_URL}/${libroId}/autores/${autorId}`);
