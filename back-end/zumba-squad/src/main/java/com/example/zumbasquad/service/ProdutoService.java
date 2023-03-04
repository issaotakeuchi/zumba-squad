package com.example.zumbasquad.service;

import com.example.zumbasquad.model.Produto;
import com.example.zumbasquad.repository.IProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    private final IProdutoRepository repository;

    public ProdutoService(IProdutoRepository repository) { this.repository = repository; }

    public Produto add(Produto produto) { return repository.save(produto); }

    public List<Produto> getAll() { return repository.findAll(); }

    public Produto getById(Long id) { return repository.findById(id).get(); }

    public List<Produto> getAllProductsByCityId(Long id) { return repository.findByCidadeId(id); }

    public List<Produto> getAllProductsByCategoryId(Long id) { return repository.findByCategoriaId(id); }
}
