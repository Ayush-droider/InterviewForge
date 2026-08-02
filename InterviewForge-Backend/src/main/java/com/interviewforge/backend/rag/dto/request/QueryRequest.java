package com.interviewforge.backend.rag.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public record QueryRequest(

        @JsonProperty("query_embeddings")
        List<List<Float>> queryEmbeddings,

        @JsonProperty("n_results")
        int nResults,

        Map<String, Object> where,

        List<String> include

) {}