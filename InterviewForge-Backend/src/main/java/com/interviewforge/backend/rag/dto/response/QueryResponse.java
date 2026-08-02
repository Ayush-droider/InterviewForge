package com.interviewforge.backend.rag.dto.response;

import java.util.List;

public record QueryResponse(

        List<List<String>> ids,

        List<List<String>> documents,

        List<List<Float>> distances

) {
}