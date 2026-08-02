package com.interviewforge.backend.rag.chroma.store;

import com.interviewforge.backend.common.config.properties.ChromaProperties;
import com.interviewforge.backend.common.config.properties.RagProperties;
import com.interviewforge.backend.rag.dto.request.AddEmbeddingsRequest;
import com.interviewforge.backend.rag.dto.request.CreateCollectionRequest;
import com.interviewforge.backend.rag.dto.request.QueryRequest;
import com.interviewforge.backend.rag.dto.response.CollectionResponse;
import com.interviewforge.backend.rag.dto.response.QueryResponse;
import com.interviewforge.backend.rag.dto.response.RetrievedChunk;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ChromaService {

    private final WebClient chromaWebClient;
    private final ChromaProperties chromaProperties;
    private final RagProperties ragProperties;

    @Getter
    private String collectionId;

    public ChromaService(
            @Qualifier("chromaWebClient") WebClient chromaWebClient,
            ChromaProperties chromaProperties,
            RagProperties ragProperties
    ) {
        this.chromaWebClient = chromaWebClient;
        this.chromaProperties = chromaProperties;
        this.ragProperties = ragProperties;
    }

    @PostConstruct
    public void initialize() {
        createCollectionIfMissing();
    }

    public void createCollectionIfMissing() {

        CollectionResponse response = chromaWebClient
                .post()
                .uri(
                        "/api/v2/tenants/{tenant}/databases/{database}/collections",
                        chromaProperties.getTenant(),
                        chromaProperties.getDatabase()
                )
                .bodyValue(new CreateCollectionRequest(
                        chromaProperties.getCollection(),
                        true
                ))
                .retrieve()
                .bodyToMono(CollectionResponse.class)
                .block();

        if (response == null) {
            throw new RuntimeException("Failed to create or retrieve Chroma collection.");
        }

        this.collectionId = response.id();

        log.info("Chroma Collection initialized. CollectionId={}", collectionId);
    }

    /**
     * Stores document chunks inside Chroma.
     */
    public void addDocuments(
            List<String> ids,
            List<String> documents,
            List<List<Float>> embeddings,
            Long userId,
            Long studyResourceId,
            String topic
    ) {

        List<Map<String, Object>> metadata = ids.stream()
                .map(id -> Map.<String, Object>of(
                        "userId", userId,
                        "studyResourceId", studyResourceId,
                        "topic", topic
                ))
                .toList();

        AddEmbeddingsRequest request = new AddEmbeddingsRequest(
                ids,
                embeddings,
                documents,
                metadata
        );

        try {

            String response = chromaWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/api/v2/tenants/{tenant}/databases/{database}/collections/{collectionId}/add")
                            .build(
                                    chromaProperties.getTenant(),
                                    chromaProperties.getDatabase(),
                                    collectionId
                            ))
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.info("Chroma response = {}", response);

        } catch (org.springframework.web.reactive.function.client.WebClientResponseException ex) {

            log.error("Status = {}", ex.getStatusCode());
            log.error("Response = {}", ex.getResponseBodyAsString());

            throw ex;
        }
    }

    /**
     * Retrieves top-K most relevant chunks for a user.
     */
    public List<RetrievedChunk> similaritySearch(
            List<Float> queryEmbedding,
            int topK,
            Long userId
    ) {

        if (collectionId == null || collectionId.isBlank()) {
            throw new IllegalStateException("Chroma collection has not been initialized.");
        }

        if (queryEmbedding == null || queryEmbedding.isEmpty()) {
            return List.of();
        }

        QueryRequest request = new QueryRequest(
                List.of(queryEmbedding),
                topK,
                Map.of("userId", userId),
                List.of("documents", "distances")
        );

        try {

            QueryResponse response = chromaWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/api/v2/tenants/{tenant}/databases/{database}/collections/{collectionId}/query")
                            .build(
                                    chromaProperties.getTenant(),
                                    chromaProperties.getDatabase(),
                                    collectionId
                            ))
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(QueryResponse.class)
                    .block();

            if (response == null
                    || response.documents() == null
                    || response.documents().isEmpty()
                    || response.distances() == null
                    || response.distances().isEmpty()) {

                log.info("No relevant chunks found for user={}", userId);
                return List.of();
            }

            List<String> documents = response.documents().get(0);
            List<Float> distances = response.distances().get(0);

            List<RetrievedChunk> retrievedChunks = new ArrayList<>();

            for (int i = 0; i < documents.size(); i++) {

                String document = documents.get(i);
                Float distance = distances.get(i);

                if (document == null || document.isBlank()) {
                    continue;
                }

                if (distance == null || distance > ragProperties.getMaxDistance()) {
                    continue;
                }

                retrievedChunks.add(new RetrievedChunk(document, distance));
            }

            retrievedChunks = retrievedChunks.stream()
                    .distinct()
                    .toList();

            log.info(
                    "Retrieved {} relevant chunks for user={}",
                    retrievedChunks.size(),
                    userId
            );

            return retrievedChunks;

        } catch (Exception ex) {

            log.error("Failed to query Chroma.", ex);

            return List.of();
        }
    }
}