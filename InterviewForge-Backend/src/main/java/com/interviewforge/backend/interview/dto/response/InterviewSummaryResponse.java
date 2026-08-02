package com.interviewforge.backend.interview.dto.response;

import java.time.LocalDateTime;

public record InterviewSummaryResponse(
        Long id,
        String targetRole,
        String status,
        Integer overallScore,
        int questionsAnswered,
        LocalDateTime startedAt,
        LocalDateTime completedAt
) {}