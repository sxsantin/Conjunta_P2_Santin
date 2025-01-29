package com.autor.autor.services;

import com.autor.autor.models.entities.Autor;

import java.util.List;
import java.util.Optional;

public interface AutorService {
    List<Autor> findAll();
    Optional<Autor> findById(Long id);
    Autor save(Autor autor);
    void deleteById(Long id);
}
