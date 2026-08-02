package com.interviewforge.backend.interview.service;

import com.interviewforge.backend.interview.dto.request.StartInterviewRequest;
import com.interviewforge.backend.interview.dto.response.InterviewResponse;

public interface InterviewService {

    InterviewResponse start(StartInterviewRequest request);

    InterviewResponse getInterview(Long interviewId);

}