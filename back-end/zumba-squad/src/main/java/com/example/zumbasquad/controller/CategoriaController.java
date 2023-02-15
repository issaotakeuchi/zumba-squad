package com.example.zumbasquad.controller;

import com.example.zumbasquad.service.CategoriaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService service;

    final static Logger log = LoggerFactory.getLogger(CategoriaController.class);

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Categoria> cadastrarCategoria(@RequestBody Categoria categoria) throws BadRequestException {
        try {
            log.info("Cadastrado nova categoria com sucesso.");
            return ResponseEntity.ok(service.add(categoria))
        } catch (Exception e) {
            log.info("Não foi possível cadstrar a categoria com base nas informações recebidas.");
            throw  new BadRequestException("Não foi possível cadastrar a consulta.")
        }
    }

    @GetMapping
    public List<Categoria> buscarTodos() { return service.getAll(); }

    @PutMapping("/atualizar")
    public ResponseEntity<Categoria> alterarCategoria(@RequestBody Categoria categoria) throws BadRequestException {
        try {
            service.getById(categoria.getId());
            service.update(categoria);
            log.info("A categoria com id: " + categoria.getId() + " foi atualizada com sucesso.");
            return ResponseEntity.ok(service.update(categoria));
        } catch (Exception e) {
            log.info("Não foi possível atualizar a categoria.");
            throw new BadRequestException("Não foi possível atualizar os dados da categoria");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirConsulta(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            service.remove(id);
            log.info("A categoria de id: " + id + " foi localizada no banco de dados e removida com sucesso.");
            return ResponseEntity.ok("Consulta excluída.");
        } catch (Exception e) {
            log.info("Não foi encontrado a consulta de id " + id + " para efetuar a exclusão.");
            throw new ResourceNotFoundException("Não foi possível excluir a consulta de id: " + id);
        }
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> processErrorBadRequest(BadRequestException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
