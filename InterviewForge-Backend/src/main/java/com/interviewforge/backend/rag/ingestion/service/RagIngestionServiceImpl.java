package com.interviewforge.backend.rag.ingestion.service;

import com.interviewforge.backend.rag.chroma.store.ChromaService;
import com.interviewforge.backend.rag.embedding.EmbeddingService;
import com.interviewforge.backend.rag.ingestion.chunking.TextChunkingService;
import com.interviewforge.backend.studyresource.entity.StudyResource;
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

            log.info("========================================");
            log.info("Starting RAG ingestion for StudyResource={}", studyResourceId);
            log.info("========================================");

            updateStatus(
                    studyResourceId,
                    StudyResource.IngestionStatus.CHUNKING
            );

            log.info("Chunking started...");

            List<String> chunks = textChunkingService.chunk(rawText);

            log.info("Chunking completed.");
            log.info("Generated {} chunks.", chunks.size());

            updateStatus(
                    studyResourceId,
                    StudyResource.IngestionStatus.EMBEDDING
            );

            log.info("Embedding started...");

            List<List<Float>> embeddings = embeddingService.embed(chunks);

            log.info("Embedding completed.");
            log.info("Generated {} embeddings.", embeddings.size());

            List<String> ids = chunks.stream()
                    .map(chunk -> UUID.randomUUID().toString())
                    .toList();

            log.info("Sending documents to Chroma...");

            chromaService.addDocuments(
                    ids,
                    chunks,
                    embeddings,
                    resource.getUser().getId(),
                    resource.getId(),
                    resource.getTopic()
            );

            log.info("Documents successfully stored in Chroma.");

            updateStatus(
                    studyResourceId,
                    StudyResource.IngestionStatus.COMPLETED
            );

            log.info("========================================");
            log.info("RAG ingestion completed successfully.");
            log.info("StudyResource={}", studyResourceId);
            log.info("========================================");

        } catch (Exception ex) {

            log.error("========================================");
            log.error("RAG INGESTION FAILED");
            log.error("StudyResourceId={}", studyResourceId);
            log.error("Exception Type={}", ex.getClass().getName());
            log.error("Exception Message={}", ex.getMessage(), ex);
            log.error("========================================");

            try {
                updateStatus(
                        studyResourceId,
                        StudyResource.IngestionStatus.FAILED
                );
            } catch (Exception updateException) {

                log.error(
                        "Failed to update ingestion status to FAILED.",
                        updateException
                );

            }
        }
    }

    @Transactional
    protected void updateStatus(
            Long studyResourceId,
            StudyResource.IngestionStatus status
    ) {

        StudyResource resource = studyResourceRepository.findById(studyResourceId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Study resource not found: " + studyResourceId));

        resource.setIngestionStatus(status);

        studyResourceRepository.save(resource);
    }
}