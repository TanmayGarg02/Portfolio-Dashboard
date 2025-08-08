package com.example.Portfolio.model;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Performance {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TimelineData {
        private String date;
        private double portfolio;
        private double nifty50;
        private double gold;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReturnData {
        private double oneMonth;
        private double threeMonths;
        private double oneYear;
    }

    private List<TimelineData> timeline;
    private Map<String, ReturnData> returns;
}

