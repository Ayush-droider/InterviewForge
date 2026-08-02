package com.interviewforge.backend.rag.dto.request;

import java.util.List;
import java.util.Map;

public record AddEmbeddingsRequest(

        List<String> ids,

        List<List<Float>> embeddings,

        List<String> documents,

        List<Map<String, Object>> metadatas

) {}