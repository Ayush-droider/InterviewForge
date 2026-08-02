package com.interviewforge.backend.auth.service;

import com.interviewforge.backend.auth.dto.response.UserProfileResponse;

public interface AuthProfileService {

    UserProfileResponse getCurrentUser();

}