package com.example.Portfolio.repositroy;

import com.example.Portfolio.model.Holding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HoldingRepository extends JpaRepository<Holding, String> {
    List<Holding> findBySector(String sector);
}

