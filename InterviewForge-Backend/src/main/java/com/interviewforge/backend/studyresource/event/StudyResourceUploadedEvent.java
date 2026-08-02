package com.interviewforge.backend.studyresource.event;

public record StudyResourceUploadedEvent(
        Long studyResourceId,
        String extractedText
) {}