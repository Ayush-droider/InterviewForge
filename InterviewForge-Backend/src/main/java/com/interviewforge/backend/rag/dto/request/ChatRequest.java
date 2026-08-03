package com.interviewforge.backend.rag.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(

        @NotBlank(message = "Question is required")
        String question

) {
}