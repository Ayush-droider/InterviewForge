package com.interviewforge.backend.rag.embedding;

import java.util.List;

public interface EmbeddingService {

    List<Float> embed(String text);

    List<List<Float>> embed(List<String> texts);
}