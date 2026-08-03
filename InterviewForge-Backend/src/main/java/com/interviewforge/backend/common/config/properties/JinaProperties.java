package com.interviewforge.backend.common.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "jina")
public class JinaProperties {

    private String apiKey;

    private String baseUrl;

    private String model;
}