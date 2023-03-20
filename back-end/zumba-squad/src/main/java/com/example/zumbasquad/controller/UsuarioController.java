//package com.example.zumbasquad.controller;
//
//import com.example.zumbasquad.exceptions.BadRequestException;
//import com.example.zumbasquad.model.Usuario;
//import com.example.zumbasquad.service.UsuarioService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/usuarios")
//public class UsuarioController {
//
//    private final UsuarioService service;
//
//    final static Logger log = LoggerFactory.getLogger(ProdutoController.class);
//
//    public UsuarioController(UsuarioService service) {
//        this.service = service;
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) throws BadRequestException{
//        try{
//            log.info("Cadastrado novo usuário com sucesso");
//            return service.add(usuario);
//        } catch (Exception e){
//            log.error("Não foi possível cadastrar novo usário com base nas informações definidas.");
//            throw new BadRequestException("Não foi possível cadastrar novo usuário.");
//        }
//    }
//
//}
