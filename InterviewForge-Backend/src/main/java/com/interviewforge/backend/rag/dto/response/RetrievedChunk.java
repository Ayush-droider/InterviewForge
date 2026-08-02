package com.interviewforge.backend.rag.dto.response;

public record RetrievedChunk(
        String content,
        float distance
) {
}