package com.interviewforge.backend.rag.ingestion.service;

import com.interviewforge.backend.studyresource.entity.StudyResource;
import com.interviewforge.backend.rag.chroma.store.ChromaService;
import com.interviewforge.backend.rag.ingestion.chunking.TextChunkingService;
import com.interviewforge.backend.rag.embedding.EmbeddingService;
import com.interviewforge.backend.studyresource.repository.StudyResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class RagIngestionServiceImpl implements RagIngestionService {

    private final StudyResourceRepository studyResourceRepository;
    private final TextChunkingService textChunkingService;
    private final EmbeddingService embeddingService;
    private final ChromaService chromaService;

    @Override
    public void ingestAsync(Long studyResourceId, String rawText) {

        try {

            StudyResource resource = studyResourceRepository.findById(studyResourceId)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Study resource not found: " + studyResourceId));

            log.info("Starting RAG ingestion for StudyResource={}", studyResourceId);

            updateStatus(studyResourceId,
                    StudyResource.IngestionStatus.CHUNKING);

            List<String> chunks = textChunkingService.chunk(rawText);

            log.info("Generated {} chunks", chunks.size());

            updateStatus(studyResourceId,
                    StudyResource.IngestionStatus.EMBEDDING);

            List<List<Float>> embeddings = embeddingService.embed(chunks);

            List<String> ids = chunks.stream()
                    .map(chunk -> UUID.randomUUID().toString())
                    .toList();

            chromaService.addDocuments(
                    ids,
                    chunks,
                    embeddings,
                    resource.getUser().getId(),
                    resource.getId(),
                    resource.getTopic()
            );

            updateStatus(studyResourceId,
                    StudyResource.IngestionStatus.COMPLETED);

            log.info("Successfully ingested StudyResource={} with {} chunks",
                    studyResourceId,
                    chunks.size());

        } catch (Exception ex) {

            log.error("Failed to ingest StudyResource={}", studyResourceId, ex);

            updateStatus(
                    studyResourceId,
                    StudyResource.IngestionStatus.FAILED
            );
        }
    }

    @Transactional
    protected void updateStatus(Long studyResourceId,
                                StudyResource.IngestionStatus status) {

        StudyResource resource = studyResourceRepository.findById(studyResourceId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Study resource not found: " + studyResourceId));

        resource.setIngestionStatus(status);

        studyResourceRepository.save(resource);
    }
}