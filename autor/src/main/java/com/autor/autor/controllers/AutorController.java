package com.autor.autor.controllers;

import com.autor.autor.models.entities.Autor;
import com.autor.autor.services.AutorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    @Autowired
    private AutorService autorService;

    // Obtener todos los autores
    @GetMapping
    public ResponseEntity<List<Autor>> findAll() {
        List<Autor> autores = autorService.findAll();
        return new ResponseEntity<>(autores, HttpStatus.OK);
    }

    // Buscar un autor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Autor> findById(@PathVariable @Positive(message = "El ID debe ser un número positivo.") Long id) {
        Optional<Autor> autor = autorService.findById(id);
        return autor.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un nuevo autor
    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Autor autor, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(error -> ((FieldError) error).getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return new ResponseEntity<>("Errores de validación: " + errorMessage, HttpStatus.BAD_REQUEST);
        }
        Autor nuevoAutor = autorService.save(autor);
        return new ResponseEntity<>(nuevoAutor, HttpStatus.CREATED);
    }

    // Actualizar un autor existente
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable @Positive(message = "El ID debe ser un número positivo.") Long id,
            @Valid @RequestBody Autor autor, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(error -> ((FieldError) error).getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return new ResponseEntity<>("Errores de validación: " + errorMessage, HttpStatus.BAD_REQUEST);
        }

        Optional<Autor> autorExistente = autorService.findById(id);
        if (autorExistente.isPresent()) {
            autor.setId(id); // Asegurarse de que el ID no cambie
            Autor autorActualizado = autorService.save(autor);
            return new ResponseEntity<>(autorActualizado, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró un autor con el ID proporcionado: " + id);
        }
    }

    // Eliminar un autor por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable @Positive(message = "El ID debe ser un número positivo.") Long id) {
        Optional<Autor> autorExistente = autorService.findById(id);
        if (autorExistente.isPresent()) {
            autorService.deleteById(id);
            return new ResponseEntity<>("Autor eliminado correctamente.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Autor no encontrado.", HttpStatus.NOT_FOUND);
        }
    }

    // Manejo de errores de validación global
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getAllErrors().stream()
                .map(error -> ((FieldError) error).getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return new ResponseEntity<>("Errores de validación: " + errorMessage, HttpStatus.BAD_REQUEST);
    }

    // Manejo de errores genéricos
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("Se ha producido un error inesperado: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
