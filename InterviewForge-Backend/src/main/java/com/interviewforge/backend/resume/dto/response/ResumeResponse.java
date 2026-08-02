package com.interviewforge.backend.resume.dto.response;

import java.time.LocalDateTime;

public record ResumeResponse(
        Long id,
        String fileName,
        String analysisStatus,
        LocalDateTime uploadedAt
) {}