package com.interviewforge.backend.auth.dto.response;

public record AuthResponse(
        String token,
        String tokenType,
        Long userId,
        String email,
        String fullName,
        String role
) {
    public static AuthResponse of(String token, Long userId, String email, String fullName, String role) {
        return new AuthResponse(token, "Bearer", userId, email, fullName, role);
    }
}