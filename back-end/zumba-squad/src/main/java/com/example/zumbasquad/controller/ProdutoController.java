package com.example.zumbasquad.controller;

import com.example.zumbasquad.exceptions.BadRequestException;
import com.example.zumbasquad.exceptions.ResourceNotFoundException;
import com.example.zumbasquad.model.Produto;
import com.example.zumbasquad.service.ProdutoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    private final ProdutoService service;
    final static Logger log = LoggerFactory.getLogger(ProdutoController.class);

    public ProdutoController(ProdutoService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Produto> cadastrarProduto(@RequestBody Produto produto) throws BadRequestException {
        try {
            log.info("Cadastrado novo produto com sucesso.");
            return  ResponseEntity.ok(service.add(produto));
        } catch (Exception e) {
            log.info("Não foi possível cadastrar o produto com base nas informações recebidas.");
            throw new BadRequestException("Não foi possível cadastrar o produto com base nas informações recebidas.");
        }
    }

    @GetMapping
    public List<Produto> buscarTodos() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoId(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            service.getById(id);
            log.info("Encontrado o produto solicitado de id: " + id);
            return ResponseEntity.ok(service.getById(id));
        } catch (Exception e) {
            log.info("Não foi encontrado o produto solicitado de id: " + id);
            throw new ResourceNotFoundException("Não foi encontrado o produto solicitado de id: " + id);
        }
    }

    @GetMapping("/por_cidade/{cidade_id}")
    public List<Produto> buscarProdutosPorCidade(Long cidade_id) {
        return service.getAllProductsByCity(cidade_id);
    }

    @GetMapping("/por_categoria/{categoria_id}")
    public List<Produto> buscarProdutosPorCategoria(Long categoria_id) {
        return service.getAllProductsByCategory(categoria_id);
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> processErrorBadRequest(BadRequestException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
