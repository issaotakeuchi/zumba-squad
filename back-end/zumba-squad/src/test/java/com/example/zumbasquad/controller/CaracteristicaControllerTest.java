package com.example.zumbasquad.controller;

import com.example.zumbasquad.model.Caracteristica;
import com.example.zumbasquad.service.CaracteristicaService;
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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest(controllers = CaracteristicaController.class)
@ActiveProfiles("test")
public class CaracteristicaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CaracteristicaService service;

    private List<Caracteristica> caracteristicas;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        this.caracteristicas = new ArrayList<>();
        this.caracteristicas.add(new Caracteristica(1L, "nome", "icone", null));
        this.caracteristicas.add(new Caracteristica(2L, "nome2", "icone2", null));

        this.objectMapper = new ObjectMapper();
    }

    @Test
    void deveBuscarTodasCaracteristicas() throws Exception{
        given(service.getAll()).willReturn(caracteristicas);

        this.mockMvc
                .perform(get("/caracteristicas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(caracteristicas.size())));
    }

    @Test
    void deveCriarNovaCaracteristica() throws Exception{
        given(service.add(any(Caracteristica.class))).willAnswer(invocation -> invocation.getArgument(0));

        this.mockMvc
                .perform(post("/caracteristicas")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(objectMapper.writeValueAsString(caracteristicas.get(0))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome", is(caracteristicas.get(0).getNome())));

    }
}
