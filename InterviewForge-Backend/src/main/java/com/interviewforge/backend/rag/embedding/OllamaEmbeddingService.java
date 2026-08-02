package com.interviewforge.backend.rag.embedding;

import jakarta.annotation.PostConstruct;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OllamaEmbeddingService implements EmbeddingService {

    private final EmbeddingModel embeddingModel;
    private final OllamaEmbeddingProperties properties;

    public OllamaEmbeddingService(
            @Qualifier("ollamaEmbeddingModel")
            EmbeddingModel embeddingModel,
            OllamaEmbeddingProperties properties) {

        this.embeddingModel = embeddingModel;
        this.properties = properties;
    }

    @PostConstruct
    public void init() {
        System.out.println("Embedding Model : " + properties.getModel());
    }

    @Override
    public List<Float> embed(String text) {

        float[] embedding = embeddingModel.embed(text);

        List<Float> result = new ArrayList<>(embedding.length);

        for (float value : embedding) {
            result.add(value);
        }

        return result;
    }

    @Override
    public List<List<Float>> embed(List<String> texts) {

        List<float[]> embeddings = embeddingModel.embed(texts);

        List<List<Float>> result = new ArrayList<>();

        for (float[] embedding : embeddings) {

            List<Float> vector = new ArrayList<>(embedding.length);

            for (float value : embedding) {
                vector.add(value);
            }

            result.add(vector);
        }

        return result;
    }
}