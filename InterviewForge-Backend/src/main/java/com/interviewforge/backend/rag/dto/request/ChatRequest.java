package com.interviewforge.backend.rag.dto.request;

public record ChatRequest(

        String question,

        Long userId

) {}