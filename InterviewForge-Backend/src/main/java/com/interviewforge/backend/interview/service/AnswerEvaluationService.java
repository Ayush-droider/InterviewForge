package com.interviewforge.backend.interview.service;

import com.interviewforge.backend.interview.dto.request.SubmitAnswerRequest;
import com.interviewforge.backend.interview.dto.response.InterviewResponse;

public interface AnswerEvaluationService {
    InterviewResponse submitAnswer(Long interviewId, SubmitAnswerRequest request);
}