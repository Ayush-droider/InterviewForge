package com.interviewforge.backend.ai.parsing;

public record GeneratedQuestion(
        String questionText,
        String topic,
        String difficulty
) {}