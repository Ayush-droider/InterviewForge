package com.interviewforge.backend.rag.dto.request;

import java.util.List;

public record JinaEmbeddingRequest(

        String model,

        List<String> input

) {
}