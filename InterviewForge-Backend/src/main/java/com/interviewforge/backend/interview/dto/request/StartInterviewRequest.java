package com.interviewforge.backend.interview.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StartInterviewRequest(
        @NotNull Long resumeId,
        @NotBlank String targetRole
) {}