package com.example.zumbasquad.repository;

import com.example.zumbasquad.model.Categoria;
import com.example.zumbasquad.model.Cidade;
import com.example.zumbasquad.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByCidade(Cidade cidade);

    List<Produto> findByCategoria(Categoria categoria);
}
