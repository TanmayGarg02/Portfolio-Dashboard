package com.example.Portfolio.service;

import com.example.Portfolio.model.Allocation;
import com.example.Portfolio.model.Holding;
import com.example.Portfolio.model.Performance;
import com.example.Portfolio.model.Summary;
import com.example.Portfolio.repositroy.HoldingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PortfolioService {

    @Autowired
    private HoldingRepository holdingRepository;
    public List<Holding> getHoldings() {
        List<Holding> holdings = holdingRepository.findAll();

        for (Holding h : holdings) {
            double value = h.getQuantity() * h.getCurrentPrice();
            double invested = h.getQuantity() * h.getAvgPrice();
            double gainLoss = value - invested;
            double gainLossPercent = invested != 0 ? (gainLoss / invested) * 100 : 0;

            h.setValue(value);
            h.setGainLoss(gainLoss);
            h.setGainLossPercent(Math.round(gainLossPercent * 100.0) / 100.0);  // round to 2 decimal places
        }

        return holdings;
    }

    public Allocation getAllocation() {
        List<Holding> holdings = getHoldings();

        double totalValue = holdings.stream()
                .mapToDouble(Holding::getValue)
                .sum();

        Map<String, Allocation.SectorData> bySector = new HashMap<>();
        Map<String, Allocation.SectorData> byMarketCap = new HashMap<>();

        for (Holding h : holdings) {
            double value = h.getValue();

            bySector.putIfAbsent(h.getSector(), new Allocation.SectorData(0, 0));
            Allocation.SectorData sectorData = bySector.get(h.getSector());
            sectorData.setValue(sectorData.getValue() + value);

            byMarketCap.putIfAbsent(h.getMarketCap(), new Allocation.SectorData(0, 0));
            Allocation.SectorData capData = byMarketCap.get(h.getMarketCap());
            capData.setValue(capData.getValue() + value);
        }

        for (Allocation.SectorData sd : bySector.values()) {
            double percent = (sd.getValue() / totalValue) * 100;
            sd.setPercentage(Math.round(percent * 100.0) / 100.0);
        }

        for (Allocation.SectorData md : byMarketCap.values()) {
            double percent = (md.getValue() / totalValue) * 100;
            md.setPercentage(Math.round(percent * 100.0) / 100.0);
        }

        return new Allocation(bySector, byMarketCap);
    }

    public Performance getPerformance() {

        // Here, we can use an API to get the real time data and we can compare that


        return new Performance(
                List.of(
                        new Performance.TimelineData("2024-01-01", 650000, 21000, 62000),
                        new Performance.TimelineData("2024-03-01", 680000, 22100, 64500),
                        new Performance.TimelineData("2024-06-01", 700000, 23500, 68000)
                ),
                Map.of(
                        "portfolio", new Performance.ReturnData(2.3, 8.1, 15.7),
                        "nifty50", new Performance.ReturnData(1.8, 6.2, 12.4),
                        "gold", new Performance.ReturnData(-0.5, 4.1, 8.9)
                )
        );
    }
    public Summary getSummary() {
        List<Holding> holdings = getHoldings();

        double totalInvested = holdings.stream()
                .mapToDouble(h -> h.getAvgPrice() * h.getQuantity())
                .sum();

        double totalValue = holdings.stream()
                .mapToDouble(Holding::getValue)
                .sum();

        double totalGainLoss = totalValue - totalInvested;
        double totalGainLossPercent = totalInvested != 0
                ? (totalGainLoss / totalInvested) * 100
                : 0;

        Holding top = holdings.stream()
                .max(Comparator.comparing(Holding::getGainLossPercent))
                .orElse(null);

        Holding worst = holdings.stream()
                .min(Comparator.comparing(Holding::getGainLossPercent))
                .orElse(null);

        long uniqueSectors = holdings.stream()
                .map(Holding::getSector)
                .distinct()
                .count();

        double diversificationScore = Math.min(10, uniqueSectors * 2.5);  
        String riskLevel = totalGainLossPercent > 15 ? "High"
                : totalGainLossPercent < 5 ? "Low" : "Moderate";

        return new Summary(
                Math.round(totalValue),
                Math.round(totalInvested),
                Math.round(totalGainLoss),
                Math.round(totalGainLossPercent * 100.0) / 100.0,
                top != null
                        ? new Summary.Performer(top.getSymbol(), top.getName(), top.getGainLossPercent())
                        : null,
                worst != null
                        ? new Summary.Performer(worst.getSymbol(), worst.getName(), worst.getGainLossPercent())
                        : null,
                Math.round(diversificationScore * 100.0) / 100.0,
                riskLevel
        );
    }

    public void addHolding(Holding holding) {
        holdingRepository.save(holding);
    }
}
