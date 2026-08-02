package com.interviewforge.backend.rag.controller;


import com.interviewforge.backend.rag.retrieval.RagRetrievalService;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test/rag")
@RequiredArgsConstructor
public class RagTestController {

    private final RagRetrievalService ragRetrievalService;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @GetMapping("/retrieve")
    public List<String> retrieve(
            @RequestParam String question
    ) {

        Long userId = authenticatedUserProvider.getCurrentUser().getId();

        return ragRetrievalService.retrieveForUser(
                question,
                userId
        );
    }
}