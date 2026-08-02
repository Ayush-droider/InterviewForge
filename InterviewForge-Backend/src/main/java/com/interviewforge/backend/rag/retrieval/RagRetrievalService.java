package com.interviewforge.backend.rag.retrieval;

import com.interviewforge.backend.common.config.properties.RagProperties;
import com.interviewforge.backend.rag.chroma.store.ChromaService;
import com.interviewforge.backend.rag.dto.response.RetrievedChunk;
import com.interviewforge.backend.rag.embedding.EmbeddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RagRetrievalService {

    private final EmbeddingService embeddingService;
    private final ChromaService chromaService;
    private final RagProperties ragProperties;

    public List<String> retrieveForUser(String question, Long userId) {

        List<Float> queryEmbedding = embeddingService.embed(question);

        List<RetrievedChunk> retrievedChunks =
                chromaService.similaritySearch(
                        queryEmbedding,
                        ragProperties.getTopK(),
                        userId
                );

        return retrievedChunks.stream()
                .map(RetrievedChunk::content)
                .toList();
    }
}