package com.example.Portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Allocation {
    private Map<String, SectorData> bySector;
    private Map<String, SectorData> byMarketCap;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SectorData {
        private double value;
        private double percentage;
    }
}
