package com.example.zumbasquad.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String descricao;
    @OneToMany(mappedBy = "produto")
    private Set<Imagem> imagens;
    @ManyToMany(mappedBy = "produtos")
    private Set<Caracteristica> caracteristicas = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    public Produto(String nome, String descricao, Set<Imagem> imagens, Set<Caracteristica> caracteristicas, Cidade cidade, Categoria categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagens = imagens;
        this.caracteristicas = caracteristicas;
        this.cidade = cidade;
        this.categoria = categoria;
    }
}
