package com.interviewforge.backend.interview.dto.response;

public record InterviewResponse(
        Long id,
        String targetRole,
        String status,
        InterviewQuestionResponse currentQuestion
) {}