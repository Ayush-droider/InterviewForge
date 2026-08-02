package com.interviewforge.backend.rag.service;

import com.interviewforge.backend.rag.retrieval.RagRetrievalService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RagChatService {

    private final ChatClient chatClient;
    private final RagRetrievalService retrievalService;

    public String ask(String question, Long userId) {

        List<String> context =
                retrievalService.retrieveForUser(question, userId);

        System.out.println("========== RAG CONTEXT ==========");
        context.forEach(System.out::println);
        System.out.println("=================================");

        String prompt = """
                Use ONLY the resume context below.

                If the answer cannot be found in the context,
                say:
                "I couldn't find that information in the uploaded resume."

                Resume Context:
                %s

                User Question:
                %s
                """
                .formatted(
                        String.join("\n\n", context),
                        question
                );

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}