package com.interviewforge.backend.resume.parsing;

import java.util.List;

public record ResumeAnalysisResult(
        List<String> skills,
        List<String> pastRoles,
        Integer estimatedYearsOfExperience,
        String experienceSummary,
        List<String> suggestedInterviewTopics
) {}