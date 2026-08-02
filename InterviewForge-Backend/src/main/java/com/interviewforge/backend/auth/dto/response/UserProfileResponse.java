package com.interviewforge.backend.auth.dto.response;

public record UserProfileResponse(
        Long id,
        String fullName,
        String email,
        String role
) {
}