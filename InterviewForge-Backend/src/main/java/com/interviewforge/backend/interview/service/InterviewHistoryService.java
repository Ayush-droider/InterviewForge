package com.interviewforge.backend.interview.service;

import com.interviewforge.backend.interview.dto.response.InterviewSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InterviewHistoryService {
    Page<InterviewSummaryResponse> getMyHistory(Pageable pageable);
}