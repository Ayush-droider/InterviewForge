package com.interviewforge.backend.interview.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SubmitAnswerRequest(
        @NotNull Long questionId,
        @NotBlank @Size(max = 5000) String answerText
) {}