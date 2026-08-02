package com.interviewforge.backend.resume.mapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.resume.dto.response.ResumeResponse;
import com.interviewforge.backend.resume.entity.Resume;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ResumeMapper {

    private final ObjectMapper objectMapper;

    public ResumeResponse toResponse(Resume resume) {

        return new ResumeResponse(
                resume.getId(),
                resume.getFileName(),
                resume.getAnalysisStatus().name(),
                resume.getUploadedAt(),
                resume.getResumeScore(),
                resume.getAtsScore(),
                resume.getExperienceSummary(),
                parseJsonList(resume.getSkillsJson()),
                parseJsonList(resume.getStrengths()),
                parseJsonList(resume.getWeaknesses()),
                parseJsonList(resume.getRecommendations()),
                parseJsonList(resume.getMissingKeywords()),
                parseJsonList(resume.getSuggestedTopicsJson())
        );
    }

    private List<String> parseJsonList(String json) {
        if (json == null || json.isBlank()) {
            return Collections.emptyList();
        }

        try {
            return objectMapper.readValue(
                    json,
                    new TypeReference<List<String>>() {
                    }
            );
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}