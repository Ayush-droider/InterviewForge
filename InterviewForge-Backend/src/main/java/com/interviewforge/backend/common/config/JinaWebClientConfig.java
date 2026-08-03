package com.interviewforge.backend.common.config;

import com.interviewforge.backend.common.config.properties.JinaProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@RequiredArgsConstructor
public class JinaWebClientConfig {

    private final JinaProperties properties;

    @Bean
    public WebClient jinaWebClient() {

        return WebClient.builder()
                .baseUrl(properties.getBaseUrl())
                .defaultHeader(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + properties.getApiKey()
                )
                .build();
    }
}