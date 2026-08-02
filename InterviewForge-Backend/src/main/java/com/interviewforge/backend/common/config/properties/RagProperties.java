package com.interviewforge.backend.common.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "rag.retrieval")
public class RagProperties {
    private int topK;
    private float maxDistance;
}