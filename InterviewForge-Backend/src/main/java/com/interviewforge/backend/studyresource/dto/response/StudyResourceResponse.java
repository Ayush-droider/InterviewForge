package com.interviewforge.backend.studyresource.dto.response;

import java.time.LocalDateTime;

public record StudyResourceResponse(
        Long id,
        String fileName,
        String topic,
        String ingestionStatus,
        LocalDateTime uploadedAt
) {}