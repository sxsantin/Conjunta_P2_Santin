package com.autor.autor.services;

import com.autor.autor.models.entities.Autor;
import com.autor.autor.repositories.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorServiceImpl implements AutorService {
    @Autowired
    private AutorRepository repository;

    @Override
    public List<Autor> findAll() {
        return (List<Autor>) repository.findAll();
    }

    @Override
    public Optional<Autor> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Autor save(Autor autor) {
        return repository.save(autor);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
