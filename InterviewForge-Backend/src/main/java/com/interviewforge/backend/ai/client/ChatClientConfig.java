package com.interviewforge.backend.ai.client;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient chatClient(
            @Qualifier("openAiChatModel") ChatModel chatModel) {

        return ChatClient.builder(chatModel)
                .defaultSystem("""
                        You are an expert technical interviewer and career coach for InterviewForge.
                        You analyze resumes precisely and factually. Never invent skills or
                        experience that isn't supported by the resume text. If information is
                        genuinely absent, omit it rather than guessing.
                        """)
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .build();
    }
}