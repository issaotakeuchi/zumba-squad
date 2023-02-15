package com.example.zumbasquad.service;

import com.example.zumbasquad.repository.ICategoriaRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    private final ICategoriaRepository repository;

    public CategoriaService(ICategoriaRepository repository) {
        this.repository = repository;
    }

    public Categoria add(Categoria categoria) {
        return repository.save(categoria);
    }

    public List<Categoria> getAll() {
        return repository.findAll();
    }


    public void remove(Long id) {
        repository.deleteById(id);
    }

    public Categoria update(Categoria categoria) {
        return repository.saveAndFlush(categoria);
    }
}
