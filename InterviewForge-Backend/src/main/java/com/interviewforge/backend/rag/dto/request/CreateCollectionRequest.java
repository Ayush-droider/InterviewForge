package com.interviewforge.backend.rag.dto.request;

public record CreateCollectionRequest(
        String name,
        boolean get_or_create
) {}