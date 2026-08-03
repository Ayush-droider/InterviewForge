package com.interviewforge.backend.rag.dto.response;

import java.util.List;

public record JinaEmbeddingResponse(

        List<Data> data

) {

    public record Data(

            List<Float> embedding,

            int index

    ) {
    }
}