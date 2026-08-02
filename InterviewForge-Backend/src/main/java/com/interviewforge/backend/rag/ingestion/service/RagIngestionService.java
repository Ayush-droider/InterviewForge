package com.interviewforge.backend.rag.ingestion.service;

public interface RagIngestionService {
    void ingestAsync(Long studyResourceId, String rawText);
}