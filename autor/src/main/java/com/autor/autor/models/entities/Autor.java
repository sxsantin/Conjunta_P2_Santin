package com.autor.autor.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "autores")
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El nombre es obligatorio.")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres.")
    @Column(nullable = false)
    private String nombre;

    @NotNull(message = "El apellido es obligatorio.")
    @Size(min = 2, max = 50, message = "El apellido debe tener entre 2 y 50 caracteres.")
    @Column(nullable = false)
    private String apellido;

    @NotNull(message = "El email es obligatorio.")
    @Email(message = "El email debe tener un formato válido.")
    @Size(max = 100, message = "El email no debe exceder los 100 caracteres.")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "El teléfono es obligatorio.")
    @Pattern(regexp = "\\d{10}", message = "El teléfono debe tener exactamente 10 dígitos.")
    @Column(nullable = false)
    private String telefono;

    @NotNull(message = "La fecha de creación es obligatoria.")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creado_en", nullable = false, updatable = false)
    private Date creadoEn;

    public Autor() {
        // Asignar la fecha de creación automáticamente
        this.creadoEn = new Date();  // Establece la fecha actual
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Date getCreadoEn() {
        return creadoEn;
    }

    public void setCreadoEn(Date creadoEn) {
        this.creadoEn = creadoEn;
    }
}
