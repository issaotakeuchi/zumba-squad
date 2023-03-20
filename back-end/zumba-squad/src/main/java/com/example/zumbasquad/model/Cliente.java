package com.example.zumbasquad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@DiscriminatorValue(value = "C")
@NoArgsConstructor
public class Cliente extends Usuario{
    @OneToMany(mappedBy = "cliente")
    private Set<Reserva> reservas;

    public Cliente(Long id, String nome, String sobrenome, String email, String senha, Papel papel, String tipo, Set<Reserva> reservas) {
        super(id, nome, sobrenome, email, senha, papel, tipo);
        this.reservas = reservas;
    }
}
