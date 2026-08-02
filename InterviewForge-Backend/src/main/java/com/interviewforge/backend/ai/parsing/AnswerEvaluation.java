package com.interviewforge.backend.ai.parsing;

public record AnswerEvaluation(
        int technicalAccuracy,
        int communicationClarity,
        int completeness,
        String feedback
) {}