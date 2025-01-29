package com.libro.libro.services;

import com.libro.libro.models.Autor;
import com.libro.libro.models.entities.Libro;
import com.libro.libro.models.entities.LibroAutor;
import com.libro.libro.repositories.LibroRepository;
import com.libro.libro.clients.AutorClientRest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository repository;

    @Autowired
    private AutorClientRest clientRest;

    @Override
    public List<Libro> findAll() {
        return (List<Libro>) repository.findAll();
    }

    @Override
    public Optional<Libro> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Libro save(Libro libro) {
        if (libro.getTitulo() == null || libro.getTitulo().isEmpty()) {
            throw new IllegalArgumentException("El título del libro es obligatorio.");
        }
        // Eliminamos la validación de descripcion
        return repository.save(libro);
    }

    @Override
    public void deleteById(Long id) {
        Optional<Libro> optionalLibro = repository.findById(id);
        if (optionalLibro.isPresent()) {
            Libro libro = optionalLibro.get();
            if (!libro.getLibroAutores().isEmpty()) {
                throw new IllegalStateException("No se puede eliminar un libro con autores asociados.");
            }
            repository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public Optional<Autor> addUser(Autor autor, Long id) {
        Optional<Libro> optional = repository.findById(id);
        if (optional.isPresent()) {
            Libro libro = optional.get();

            // Verificar si el autor ya está asociado con el libro
            boolean isAlreadyAssociated = libro.getLibroAutores().stream()
                    .anyMatch(libroAutor -> libroAutor.getAutorId().equals(autor.getId()));

            if (isAlreadyAssociated) {
                throw new IllegalArgumentException("El autor ya está asociado con este libro.");
            }

            Autor autorTemp = clientRest.findById(autor.getId());
            LibroAutor libroAutor = new LibroAutor();
            libroAutor.setAutorId(autorTemp.getId());

            libro.addLibroAutor(libroAutor);
            repository.save(libro);

            return Optional.of(autorTemp);
        }
        return Optional.empty();
    }

    @Override
    public List<Autor> findUsersByLibroId(Long libroId) {
        Optional<Libro> optionalLibro = repository.findById(libroId);
        if (optionalLibro.isPresent()) {
            Libro libro = optionalLibro.get();
            List<Autor> allAutores = clientRest.findAll();
            return libro.getAutores(allAutores);
        }
        return Collections.emptyList(); // Devuelve una lista vacía si no se encuentra el libro
    }

    @Override
    public Autor addAutor(Autor autor) {
        List<Autor> autoresExistentes = clientRest.findAll();
        boolean emailExists = autoresExistentes.stream()
                .anyMatch(a -> a.getEmail().equalsIgnoreCase(autor.getEmail()));
        if (emailExists) {
            throw new IllegalArgumentException("Ya existe un autor con este correo electrónico.");
        }
        return clientRest.save(autor);
    }

    @Override
    @Transactional
    public boolean removeUserFromLibro(Long libroId, Long autorId) {
        Optional<Libro> optionalLibro = repository.findById(libroId);
        if (optionalLibro.isPresent()) {
            Libro libro = optionalLibro.get();
            LibroAutor libroAutorToRemove = null;

            for (LibroAutor libroAutor : libro.getLibroAutores()) {
                if (libroAutor.getAutorId().equals(autorId)) {
                    libroAutorToRemove = libroAutor;
                    break;
                }
            }

            if (libroAutorToRemove != null) {
                libro.removeLibroAutor(libroAutorToRemove);
                repository.save(libro); // Guarda el libro actualizado
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Libro> findLibrosByAutorId(Long autorId) {
        List<Libro> libros = (List<Libro>) repository.findAll();
        List<Libro> librosDelAutor = new ArrayList<>();

        for (Libro libro : libros) {
            for (LibroAutor libroAutor : libro.getLibroAutores()) {
                if (libroAutor.getAutorId().equals(autorId)) {
                    librosDelAutor.add(libro);
                    break;
                }
            }
        }
        return librosDelAutor;
    }
}
