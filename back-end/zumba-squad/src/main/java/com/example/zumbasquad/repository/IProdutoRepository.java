package com.example.zumbasquad.repository;

import com.example.zumbasquad.model.Categoria;
import com.example.zumbasquad.model.Cidade;
import com.example.zumbasquad.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT DISTINCT p FROM Produto p JOIN p.cidade c WHERE c.id LIKE '%cidade_id%'")
    List<Produto> findAllProductsByCity(Long cidade_id);

    @Query("SELECT DISTINCT p FROM Produto p JOIN p.categoria c WHERE c.id LIKE '%categoria_id%'`")
    List<Produto> findAllProductsByCategory(Long categoria_id);
}
