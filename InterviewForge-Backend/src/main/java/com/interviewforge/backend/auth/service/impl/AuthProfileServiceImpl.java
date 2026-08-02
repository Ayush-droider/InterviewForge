package com.interviewforge.backend.auth.service.impl;

import com.interviewforge.backend.auth.dto.response.UserProfileResponse;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.auth.service.AuthProfileService;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthProfileServiceImpl implements AuthProfileService {

    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public UserProfileResponse getCurrentUser() {

        User user = authenticatedUserProvider.getCurrentUser();

        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}