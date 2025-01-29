import axios from 'axios';

const API_URL = 'http://localhost:8001/api/autores';

export const getAutores = () => axios.get(API_URL);
export const createAutor = (autor) => axios.post(API_URL, autor);
export const deleteAutor = (id) => axios.delete(`${API_URL}/${id}`);
export const getAutorById = (id) => axios.get(`${API_URL}/${id}`);
export const updateAutor = (id, autor) => axios.put(`${API_URL}/${id}`, autor);
