package com.interviewforge.backend.resume.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record ResumeResponse(
        Long id,
        String fileName,
        String analysisStatus,
        LocalDateTime uploadedAt,
        Integer resumeScore,
        Integer atsScore,
        String experienceSummary,
        List<String> skills,
        List<String> strengths,
        List<String> weaknesses,
        List<String> recommendations,
        List<String> missingKeywords,
        List<String> suggestedInterviewTopics
) {
}