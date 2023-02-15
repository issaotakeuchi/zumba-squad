package com.example.zumbasquad.service;

import com.example.zumbasquad.repository.ICategoriaRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    private final ICategoriaRepository repository;

    public CategoriaService(ICategoriaRepository repository) {
        this.repository = repository;
    }
}
