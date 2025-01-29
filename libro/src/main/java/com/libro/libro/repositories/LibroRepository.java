package com.libro.libro.repositories;

import com.libro.libro.models.entities.Libro;
import org.springframework.data.repository.CrudRepository;

public interface LibroRepository extends CrudRepository<Libro, Long> {

}
