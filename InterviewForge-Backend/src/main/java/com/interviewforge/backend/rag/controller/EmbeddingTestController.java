package com.interviewforge.backend.rag.controller;

import com.interviewforge.backend.rag.embedding.JinaEmbeddingClient;
import com.interviewforge.backend.rag.vector.VectorDocument;
import com.interviewforge.backend.rag.vector.VectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test/embedding")
@RequiredArgsConstructor
public class EmbeddingTestController {

    private final JinaEmbeddingClient embeddingClient;
    private final VectorRepository vectorRepository;

    @GetMapping("/vector")
    public List<Float> generateEmbedding(
            @RequestParam String text
    ) {

        return embeddingClient.embed(text);
    }

    @PostMapping("/store")
    public String storeDocument(
            @RequestParam Long userId,
            @RequestParam Long studyResourceId,
            @RequestParam String topic,
            @RequestBody String content
    ) {

        List<Float> embedding =
                embeddingClient.embed(content);

        vectorRepository.saveChunk(
                userId,
                studyResourceId,
                topic,
                content,
                embedding
        );

        return "Document stored successfully.";
    }

    @GetMapping("/search")
    public List<VectorDocument> search(
            @RequestParam Long userId,
            @RequestParam String question,
            @RequestParam(defaultValue = "5") int topK
    ) {

        List<Float> embedding =
                embeddingClient.embed(question);

        return vectorRepository.findSimilarChunks(
                userId,
                embedding,
                topK
        );
    }
}