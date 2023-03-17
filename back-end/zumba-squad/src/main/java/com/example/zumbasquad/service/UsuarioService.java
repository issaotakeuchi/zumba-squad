package com.example.zumbasquad.service;

import com.example.zumbasquad.model.Usuario;
import com.example.zumbasquad.repository.IUsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final IUsuarioRepository repository;


    public UsuarioService(IUsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario add(Usuario usuario){
        return repository.save(usuario);
    }
}
