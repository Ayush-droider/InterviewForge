package com.interviewforge.backend.rag.dto.response;

import java.util.Map;

public record CollectionResponse(
        String id,
        String name,
        Map<String, Object> metadata
) {}