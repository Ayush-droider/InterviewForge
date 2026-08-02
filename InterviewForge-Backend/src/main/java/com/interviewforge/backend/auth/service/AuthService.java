package com.interviewforge.backend.auth.service;

import com.interviewforge.backend.auth.dto.request.LoginRequest;
import com.interviewforge.backend.auth.dto.request.RegisterRequest;
import com.interviewforge.backend.auth.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}