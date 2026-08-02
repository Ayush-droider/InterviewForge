package com.interviewforge.backend.interview.dto.response;

public record TopicBreakdown(
        String topic,
        double averageScore,
        int questionCount
) {}