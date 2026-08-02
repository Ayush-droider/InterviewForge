package com.interviewforge.backend.auth.service.impl;

import com.interviewforge.backend.auth.dto.request.LoginRequest;
import com.interviewforge.backend.auth.dto.request.RegisterRequest;
import com.interviewforge.backend.auth.dto.response.AuthResponse;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.common.exception.DuplicateEmailException;
import com.interviewforge.backend.auth.repository.UserRepository;
import com.interviewforge.backend.security.jwt.JwtService;
import com.interviewforge.backend.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("An account with email " + request.email() + " already exists");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(User.Role.USER)
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(toUserDetails(saved));

        return AuthResponse.of(token, saved.getId(), saved.getEmail(), saved.getFullName(), saved.getRole().name());
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found — data integrity issue"));

        String token = jwtService.generateToken(userDetails);

        return AuthResponse.of(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole().name());
    }

    private UserDetails toUserDetails(User user) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPasswordHash())
                .authorities("ROLE_" + user.getRole().name())
                .build();
    }
}