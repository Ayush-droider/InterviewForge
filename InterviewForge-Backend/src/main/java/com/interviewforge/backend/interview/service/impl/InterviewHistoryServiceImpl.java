package com.interviewforge.backend.interview.service.impl;

import com.interviewforge.backend.interview.dto.response.InterviewSummaryResponse;
import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.interview.entity.InterviewQuestion;
import com.interviewforge.backend.interview.repository.InterviewRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.interview.service.InterviewHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterviewHistoryServiceImpl implements InterviewHistoryService {

    private final InterviewRepository interviewRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public Page<InterviewSummaryResponse> getMyHistory(Pageable pageable) {
        User currentUser = authenticatedUserProvider.getCurrentUser();
        return interviewRepository.findAllByUserIdOrderByStartedAtDesc(currentUser.getId(), pageable)
                .map(this::toSummary);
    }

    private InterviewSummaryResponse toSummary(Interview interview) {
        long answeredCount = interview.getQuestions().stream()
                .filter(q -> q.getStatus() == InterviewQuestion.Status.ANSWERED)
                .count();

        return new InterviewSummaryResponse(
                interview.getId(),
                interview.getTargetRole(),
                interview.getStatus().name(),
                interview.getOverallScore(),
                (int) answeredCount,
                interview.getStartedAt(),
                interview.getCompletedAt()
        );
    }
}