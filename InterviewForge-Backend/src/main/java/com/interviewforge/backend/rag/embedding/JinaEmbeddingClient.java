package com.interviewforge.backend.rag.embedding;

import com.interviewforge.backend.common.config.properties.JinaProperties;

import com.interviewforge.backend.rag.dto.request.JinaEmbeddingRequest;
import com.interviewforge.backend.rag.dto.response.JinaEmbeddingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.util.List;

@Component
@Slf4j
public class JinaEmbeddingClient {

    private final JinaProperties properties;
    private final WebClient webClient;

    public JinaEmbeddingClient(
            @Qualifier("jinaWebClient") WebClient webClient,
            JinaProperties properties
    ) {
        this.webClient = webClient;
        this.properties = properties;
    }

    public List<Float> embed(String text) {

        return embed(List.of(text)).get(0);
    }

    public List<List<Float>> embed(List<String> texts) {

        try {

            JinaEmbeddingRequest request =
                    new JinaEmbeddingRequest(
                            properties.getModel(),
                            texts
                    );

            JinaEmbeddingResponse response =
                    webClient.post()
                            .uri("/embeddings")
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(request)
                            .retrieve()
                            .bodyToMono(JinaEmbeddingResponse.class)
                            .timeout(Duration.ofSeconds(60))
                            .block();

            if (response == null
                    || response.data() == null
                    || response.data().isEmpty()) {

                throw new RuntimeException("Empty embedding response from Jina.");
            }

            return response.data()
                    .stream()
                    .map(JinaEmbeddingResponse.Data::embedding)
                    .toList();

        } catch (WebClientResponseException ex) {

            log.error("Jina Error: {}", ex.getResponseBodyAsString());

            throw new RuntimeException(ex);

        } catch (Exception ex) {

            log.error("Embedding generation failed.", ex);

            throw new RuntimeException(ex);
        }
    }

}