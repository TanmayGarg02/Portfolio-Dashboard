package com.example.Portfolio.model;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Summary {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Performer {
        private String symbol;
        private String name;
        private double gainPercent;
    }

    private double totalValue;
    private double totalInvested;
    private double totalGainLoss;
    private double totalGainLossPercent;
    private Performer topPerformer;
    private Performer worstPerformer;
    private double diversificationScore;
    private String riskLevel;
}

