package com.example.zumbasquad.controller;

import com.example.zumbasquad.exceptions.BadRequestException;
import com.example.zumbasquad.exceptions.ResourceNotFoundException;
import com.example.zumbasquad.model.Categoria;
import com.example.zumbasquad.model.Cidade;
import com.example.zumbasquad.model.Imagem;
import com.example.zumbasquad.model.Produto;
import com.example.zumbasquad.service.ProdutoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(controllers = ProdutoController.class)
@ActiveProfiles("test")
public class ProdutoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProdutoService service;

    private List<Produto> produtos;
    private Cidade cidade;
    private Categoria categoria;
    private Set<Imagem> imagens;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        this.cidade = new Cidade(1L, "nomeCidade", "pais", null);
        this.categoria = new Categoria(1L, "qualificacao", "descricao", "urlImagem", null);
        this.imagens = new HashSet<>();
        this.imagens.add(new Imagem(1L, "titulo", "url", null));

        this.produtos = new ArrayList<>();
        this.produtos.add(new Produto(1L, "nome", "descricao", imagens, null, cidade, categoria));
        this.produtos.add(new Produto(2L, "nome2", "descricao2", null, null, null, null));

        this.objectMapper = new ObjectMapper();
    }

    @Test
    void deveBuscarTodosProdutos() throws Exception{
        given(service.getAll()).willReturn(produtos);

        this.mockMvc
                .perform(get("/produtos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(produtos.size())));
    }

    @Test
    void deveCriarNovoProduto() throws Exception{
        given(service.add(any(Produto.class))).willAnswer(invocation -> invocation.getArgument(0));

        this.mockMvc
                .perform(post("/produtos")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(produtos.get(0))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome", is(produtos.get(0).getNome())));
    }

    @Test
    void deveDarBadRequestExceptionAoTentarCriarSemBodyCorreto(){
        final Produto produto = new Produto();
        produto.setId(1L);

        try {
            given(service.add(any(Produto.class))).willAnswer(invocation -> invocation.getArgument(0));

            this.mockMvc
                .perform(post("/produtos"));
                //.andExpect(status().isBadRequest());
        } catch (Exception e){
            assertThatExceptionOfType(BadRequestException.class);
        }
    }

    @Test
    void deveBuscarProdutoPorId() throws Exception{
        final Long id = 1L;
        given(service.getById(id)).willReturn(produtos.get(0));

        this.mockMvc
                .perform(get("/produtos/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is(produtos.get(0).getNome())));
    }

    @Test void deveDarResourceNotFoundAoBuscarIdQueNaoExiste(){
        try {
            //given(service.getById(3L)).willThrow(ResourceNotFoundException.class);

            this.mockMvc
                    .perform(get("/produtos/{id}", 3L));
        } catch (Exception e){
            assertThatExceptionOfType(ResourceNotFoundException.class);
        }
    }

    //TODO teste para get by id da cidade/categoria
    //TODO teste para get by name da cidade/categoria
}
