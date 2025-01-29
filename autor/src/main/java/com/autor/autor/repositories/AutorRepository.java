package com.autor.autor.repositories;

import com.autor.autor.models.entities.Autor;
import org.springframework.data.repository.CrudRepository;

public interface AutorRepository extends CrudRepository<Autor, Long> {
}
