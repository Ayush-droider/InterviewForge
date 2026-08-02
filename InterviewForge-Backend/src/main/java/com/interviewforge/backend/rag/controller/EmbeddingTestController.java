package com.interviewforge.backend.rag.controller;

import com.interviewforge.backend.rag.chroma.store.ChromaService;
import com.interviewforge.backend.rag.dto.response.RetrievedChunk;
import com.interviewforge.backend.rag.embedding.EmbeddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class EmbeddingTestController {

    private final EmbeddingService embeddingService;
    private final ChromaService chromaService;

    @GetMapping("/embedding")
    public Integer embedding() {

        List<Float> vector =
                embeddingService.embed("Spring Boot is awesome");

        return vector.size();
    }

    @GetMapping("/add")
    public String add() {

        List<String> docs = List.of(
                "Spring Boot is a Java framework."
        );

        List<List<Float>> embeddings =
                embeddingService.embed(docs);

        chromaService.addDocuments(
                List.of(UUID.randomUUID().toString()),
                docs,
                embeddings,
                1L,
                999L,
                "Spring Boot"
        );

        return "Stored Successfully";
    }

    @GetMapping("/query")
    public List<RetrievedChunk> query() {

        List<Float> embedding =
                embeddingService.embed("What is Spring Boot?");

        return chromaService.similaritySearch(
                embedding,
                5,
                1L
        );
    }
}