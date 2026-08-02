package com.interviewforge.backend.interview.dto.response;

public record DimensionBreakdown(
        double avgTechnicalAccuracy,
        double avgCommunicationClarity,
        double avgCompleteness
) {}