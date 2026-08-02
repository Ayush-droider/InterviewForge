package com.interviewforge.backend.rag.embedding;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.ai.ollama.embedding.options")
@Getter
@Setter
public class OllamaEmbeddingProperties {

    /**
     * Embedding model configured in application.yml
     */
    private String model = "nomic-embed-text";
}