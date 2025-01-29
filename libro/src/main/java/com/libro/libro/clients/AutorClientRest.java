package com.libro.libro.clients;

import com.libro.libro.models.Autor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "autores", url = "localhost:8001/api/autores")
public interface AutorClientRest {
    @GetMapping("/{id}")
    Autor findById(@PathVariable Long id);
    @GetMapping
    List<Autor> findAll();
    @PostMapping
    Autor save(@RequestBody Autor autor);
}
