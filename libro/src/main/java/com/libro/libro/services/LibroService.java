package com.libro.libro.services;

import com.libro.libro.models.Autor;
import com.libro.libro.models.entities.Libro;

import java.util.List;
import java.util.Optional;

public interface LibroService {
    List<Libro> findAll();
    Optional<Libro> findById(Long id);
    Libro save(Libro libro);
    void deleteById(Long id);

    Optional<Autor> addUser (Autor autor, Long id);
    List<Autor> findUsersByLibroId(Long libroId);
    Autor addAutor(Autor autor);
    boolean removeUserFromLibro(Long libroId, Long autorId);
    List<Libro> findLibrosByAutorId(Long autorId);
}