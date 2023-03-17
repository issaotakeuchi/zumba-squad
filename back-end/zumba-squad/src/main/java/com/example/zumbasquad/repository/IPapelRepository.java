package com.example.zumbasquad.repository;

import com.example.zumbasquad.model.Papel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPapelRepository extends JpaRepository<Papel, Long> {
}
