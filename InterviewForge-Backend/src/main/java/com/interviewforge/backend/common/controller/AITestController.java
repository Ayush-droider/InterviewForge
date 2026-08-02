package com.interviewforge.backend.common.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test/ai")
@RequiredArgsConstructor
public class AITestController {

    private final ChatClient chatClient;

    @GetMapping("/ping")
    public String ping() {

        return chatClient.prompt()
                .user("Reply with exactly: AI is working!")
                .call()
                .content();
    }

    @PostMapping("/ask")
    public String ask(@RequestBody String question) {

        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}