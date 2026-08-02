package com.interviewforge.backend.resume.parsing;

import java.util.List;

public record ResumeAnalysisResult(
        Integer resumeScore,
        Integer atsScore,
        List<String> skills,
        List<String> pastRoles,
        Integer estimatedYearsOfExperience,
        String experienceSummary,
        List<String> strengths,
        List<String> weaknesses,
        List<String> recommendations,
        List<String> missingKeywords,
        List<String> suggestedInterviewTopics
) {}