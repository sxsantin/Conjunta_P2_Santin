package com.libro.libro.controllers;

import com.libro.libro.models.Autor;
import com.libro.libro.models.entities.Libro;
import com.libro.libro.services.LibroService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    @Autowired
    private LibroService libroService;

    // Obtener todos los libros
    @GetMapping
    public ResponseEntity<List<Libro>> findAll() {
        List<Libro> libros = libroService.findAll();
        if (libros.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Respuesta vacía con código 404
        }
        return new ResponseEntity<>(libros, HttpStatus.OK); // Devuelve la lista de libros
    }

    // Obtener un libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Libro> findById(@PathVariable Long id) {
        Optional<Libro> libro = libroService.findById(id);
        if (libro.isPresent()) {
            return new ResponseEntity<>(libro.get(), HttpStatus.OK); // Devuelve el libro con código 200
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si no se encuentra el libro, devuelve 404
        }
    }


    // Crear un nuevo libro
    @PostMapping
    public ResponseEntity<Libro> save(@RequestBody Libro libro) {
        if (libro == null || libro.getTitulo() == null || libro.getCodigo() == null || libro.getFechaPublicacion() == null) {
            // Crear un libro vacío para devolverlo en el ResponseEntity
            Libro libroVacio = new Libro();
            return new ResponseEntity<>(libroVacio, HttpStatus.BAD_REQUEST);
        }
        Libro libroGuardado = libroService.save(libro);
        return new ResponseEntity<>(libroGuardado, HttpStatus.CREATED);
    }

    // Actualizar un libro existente
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Libro libro) {
        Optional<Libro> libroExistente = libroService.findById(id);
        if (libroExistente.isPresent()) {
            libro.setId(id); // Asegurarse de que el ID no cambie
            libroService.save(libro);
            return new ResponseEntity<>("Libro actualizado correctamente.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Libro no encontrado.", HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un libro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        Optional<Libro> libroExistente = libroService.findById(id);
        if (libroExistente.isPresent()) {
            libroService.deleteById(id);
            return new ResponseEntity<>("Libro eliminado correctamente.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Libro no encontrado.", HttpStatus.NOT_FOUND);
        }
    }

    // Asociar un autor a un libro
    @PostMapping("/{id}/autores")
    public ResponseEntity<String> addUser(@PathVariable Long id, @RequestBody Autor autor) {
        Optional<Autor> optional;
        try {
            optional = libroService.addUser(autor, id);
        } catch (FeignException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Autor no encontrado: " + ex.getMessage());
        }
        return optional.map(value -> new ResponseEntity<>("Autor asociado correctamente.", HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>("No se pudo asociar el autor al libro.", HttpStatus.BAD_REQUEST));
    }

    // Obtener los autores de un libro
    @GetMapping("/{id}/autores")
    public ResponseEntity<List<Autor>> findUsersByLibroId(@PathVariable Long id) {
        List<Autor> autores = libroService.findUsersByLibroId(id);
        if (autores.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Respuesta vacía con código 404
        }
        return new ResponseEntity<>(autores, HttpStatus.OK); // Devuelve la lista de autores
    }


    // Eliminar un autor de un libro
    @DeleteMapping("/{libroId}/autores/{autorId}")
    public ResponseEntity<String> removeUserFromLibro(@PathVariable Long libroId, @PathVariable Long autorId) {
        boolean removed = libroService.removeUserFromLibro(libroId, autorId);
        if (removed) {
            return new ResponseEntity<>("Autor eliminado del libro correctamente.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se pudo eliminar el autor del libro.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/autor/{autorId}")
    public ResponseEntity<List<Libro>> getLibrosByAutor(@PathVariable Long autorId) {
        List<Libro> libros = libroService.findLibrosByAutorId(autorId);
        if (libros.isEmpty()) {
            return ResponseEntity.noContent().build(); // Devuelve 204 si no hay libros
        }
        return ResponseEntity.ok(libros); // Devuelve la lista de libros
    }
}
