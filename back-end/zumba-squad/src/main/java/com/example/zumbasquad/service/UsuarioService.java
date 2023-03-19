//package com.example.zumbasquad.service;
//
//import com.example.zumbasquad.model.Usuario;
//import com.example.zumbasquad.repository.IUsuarioRepository;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UsuarioService {
//
//    private final IUsuarioRepository repository;
//
//    PasswordEncoder pe;
//
//
//    public UsuarioService(IUsuarioRepository repository) {
//        this.repository = repository;
//        this.pe = new BCryptPasswordEncoder();
//    }
//
//    public Usuario add(Usuario usuario){
//        String senhaEncriptada = this.pe.encode(usuario.getSenha());
//        usuario.setSenha(senhaEncriptada);
//        return repository.save(usuario);
//    }
//
//}
