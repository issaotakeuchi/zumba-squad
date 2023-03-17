package com.example.zumbasquad.repository;

import com.example.zumbasquad.model.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
}
