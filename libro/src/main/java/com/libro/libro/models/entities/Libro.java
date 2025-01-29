package com.libro.libro.models.entities;

import com.libro.libro.models.Autor;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String codigo;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_publicacion", nullable = false)
    private java.util.Date fechaPublicacion;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "libro_id")
    private List<LibroAutor> libroAutores;

    @Transient
    private List<Autor> autores;

    public Libro() {
        libroAutores = new ArrayList<>();
        autores = new ArrayList<>();
    }

    public void addLibroAutor(LibroAutor libroAutor) {
        if (libroAutor == null) {
            throw new IllegalArgumentException("LibroAutor no puede ser nulo");
        }
        libroAutores.add(libroAutor);
    }

    public void removeLibroAutor(LibroAutor libroAutor) {
        if (libroAutor == null) {
            throw new IllegalArgumentException("LibroAutor no puede ser nulo");
        }
        if (!libroAutores.contains(libroAutor)) {
            throw new IllegalStateException("El LibroAutor no está asociado con este libro");
        }
        libroAutores.remove(libroAutor);
    }

    public List<Autor> getAutores(List<Autor> allAutores) {
        if (allAutores == null) {
            throw new IllegalArgumentException("La lista de autores no puede ser nula");
        }

        List<Autor> autoresList = new ArrayList<>();
        for (LibroAutor libroAutor : libroAutores) {
            if (libroAutor == null) {
                continue;
            }
            for (Autor autor : allAutores) {
                if (autor == null) {
                    continue;
                }
                if (Objects.equals(autor.getId(), libroAutor.getAutorId())) {
                    autoresList.add(autor);
                }
            }
        }
        return autoresList;
    }

    public List<LibroAutor> getLibroAutores() {
        return libroAutores;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("El ID del libro debe ser positivo y no nulo");
        }
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        if (titulo == null || titulo.isEmpty()) {
            throw new IllegalArgumentException("El título del libro no puede ser nulo o vacío");
        }
        this.titulo = titulo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        if (codigo == null || codigo.isEmpty()) {
            throw new IllegalArgumentException("El código del libro no puede ser nulo o vacío");
        }
        this.codigo = codigo;
    }

    public java.util.Date getFechaPublicacion() {
        return fechaPublicacion;
    }

    public void setFechaPublicacion(java.util.Date fechaPublicacion) {
        if (fechaPublicacion == null) {
            throw new IllegalArgumentException("La fecha de publicación no puede ser nula");
        }
        this.fechaPublicacion = fechaPublicacion;
    }
}
