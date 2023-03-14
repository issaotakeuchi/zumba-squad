package com.example.zumbasquad.components;

import com.example.zumbasquad.model.*;
import com.example.zumbasquad.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;


@Component
public class ProdutoDataLoader implements CommandLineRunner {

    @Autowired
    IProdutoRepository produtoRepository;
    @Autowired
    IImagemRepository imagemRepository;
    @Autowired
    ICaracteristicaRepository caracteristicaRepository;
    @Autowired
    ICidadeRepository cidadeRepository;
    @Autowired
    ICategoriaRepository categoriaRepository;

    @Override
    public void run(String... args) throws Exception{
        loadProdutoData();
    }

    private void loadProdutoData() throws Exception {
        if (produtoRepository.count() == 0){

            Imagem i1 = new Imagem("Img01", "https://a0.muscache.com/im/pictures/8a16688a-1f1d-4530-ad1f-dfff1b7e5298.jpg?im_w=1200");
            Set<Imagem> imagens = new HashSet<>();
            imagens.add(i1);
            imagens.add(i1);
            imagens.add(i1);

            imagemRepository.save(i1);

            Caracteristica wifi = new Caracteristica("wi-fi", "iconeWifi");
            Caracteristica pool = new Caracteristica("pool", "iconePool");
            Caracteristica pets = new Caracteristica("pets", "iconePets");
            Set<Caracteristica> caracteristicas = new HashSet<>();
            caracteristicas.add(wifi);
            caracteristicas.add(pool);
            caracteristicas.add(pets);

            caracteristicaRepository.save(wifi);
            caracteristicaRepository.save(pool);
            caracteristicaRepository.save(pets);

            Cidade cidade = new Cidade("Rio de Janeiro", "Brasil");

            cidadeRepository.save(cidade);

            Categoria categoria = new Categoria("Hoteis", "Hotéis próximos de praia.", "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg");

            categoriaRepository.save(categoria);

            Produto p1 = new Produto("Rancho Alto da Colina", "No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires. No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires.", imagens, caracteristicas, cidade, categoria);
            Produto p2 = new Produto("Rancho Alto da Colina", "No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires. No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires.", imagens, caracteristicas, cidade, categoria);
            Produto p3 = new Produto("Rancho Alto da Colina", "No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires. No coração de San Telmo, desfrute de uma pousada inspirada nas paixões de Buenos Aires.", imagens, caracteristicas, cidade, categoria);

            produtoRepository.save(p1);
            produtoRepository.save(p2);
            produtoRepository.save(p3);
        }
    }
}
