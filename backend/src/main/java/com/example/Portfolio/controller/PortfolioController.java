package com.example.Portfolio.controller;

import com.example.Portfolio.model.Allocation;
import com.example.Portfolio.model.Holding;
import com.example.Portfolio.model.Performance;
import com.example.Portfolio.model.Summary;
import com.example.Portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080"},
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowCredentials = "true")
public class PortfolioController {

    @Autowired
    private PortfolioService service;


    @PostMapping("/add")
    public void addHolding(@RequestBody Holding holding){
        service.addHolding(holding);
    }

    @GetMapping("/holdings")
    public ResponseEntity<List<Holding>> getHoldings() {
        return ResponseEntity.ok(service.getHoldings());
    }

    @GetMapping("/allocation")
    public ResponseEntity<Allocation> getAllocation() {
        return ResponseEntity.ok(service.getAllocation());
    }

    @GetMapping("/performance")
    public ResponseEntity<Performance> getPerformance() {
        return ResponseEntity.ok(service.getPerformance());
    }

    @GetMapping("/summary")
    public ResponseEntity<Summary> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }
}
