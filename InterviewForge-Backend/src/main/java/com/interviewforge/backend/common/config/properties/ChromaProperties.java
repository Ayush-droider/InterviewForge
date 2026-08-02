package com.interviewforge.backend.common.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "chroma")
public class ChromaProperties {
    private String tenant;
    private String database;
    private String collection;
}