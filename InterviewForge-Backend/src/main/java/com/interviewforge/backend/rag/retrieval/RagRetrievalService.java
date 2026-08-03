package com.interviewforge.backend.rag.retrieval;

import com.interviewforge.backend.common.config.properties.RagProperties;
import com.interviewforge.backend.rag.embedding.JinaEmbeddingClient;
import com.interviewforge.backend.rag.vector.VectorDocument;
import com.interviewforge.backend.rag.vector.VectorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RagRetrievalService {

    private final JinaEmbeddingClient embeddingClient;
    private final VectorRepository vectorRepository;
    private final RagProperties ragProperties;

    public List<String> retrieveForUser(
            String question,
            Long userId
    ) {

        log.info("Generating embedding for user question...");

        List<Float> embedding = embeddingClient.embed(question);

        log.info("Searching similar chunks...");

        List<VectorDocument> documents =
                vectorRepository.findSimilarChunks(
                        userId,
                        embedding,
                        ragProperties.getTopK()
                );

        log.info("Retrieved {} chunks.", documents.size());

        return documents.stream()
                .map(VectorDocument::getContent)
                .toList();
    }
}