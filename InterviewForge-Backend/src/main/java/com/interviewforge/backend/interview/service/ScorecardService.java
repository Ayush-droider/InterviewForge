package com.interviewforge.backend.interview.service;

import com.interviewforge.backend.interview.dto.response.ScorecardResponse;
import com.interviewforge.backend.interview.entity.Interview;

public interface ScorecardService {
    void generateFinalFeedback(Interview interview);
    ScorecardResponse getScorecard(Long interviewId);
}