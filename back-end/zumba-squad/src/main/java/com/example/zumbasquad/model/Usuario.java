package com.example.zumbasquad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo", length = 1, discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue(value = "U")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuarios")
public class Usuario {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "papel_id", referencedColumnName = "id")
    private Papel papel;
    @Column(insertable=false, updatable=false)
    private String tipo;
}
