package com.interviewforge.backend.rag.ingestion.chunking;

import java.util.List;

public interface TextChunkingService {

    List<String> chunk(String text);

}