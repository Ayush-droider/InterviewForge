package com.interviewforge.backend.interview.dto.response;

public record InterviewQuestionResponse(
        Long id,
        Integer sequenceNumber,
        String questionText,
        String topic,
        String difficulty
) {}