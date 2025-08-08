package com.example.Portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "holdings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Holding {

    @Id
    private String symbol;

    private String name;
    private int quantity;

    @Column(name = "avg_price")
    private double avgPrice;

    @Column(name = "current_price")
    private double currentPrice;

    private String sector;

    @Column(name = "market_cap")
    private String marketCap;

    @Column(name = "exchange")
    private String exchange;

    private double value;

    @Column(name = "gain_loss")
    private double gainLoss;

    @Column(name = "gain_loss_percent")
    private double gainLossPercent;
}
