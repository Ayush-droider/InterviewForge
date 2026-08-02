package com.interviewforge.backend.interview.service.impl;

import com.interviewforge.backend.interview.dto.request.StartInterviewRequest;
import com.interviewforge.backend.interview.dto.response.InterviewQuestionResponse;
import com.interviewforge.backend.interview.dto.response.InterviewResponse;
import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.interview.entity.InterviewQuestion;
import com.interviewforge.backend.resume.entity.Resume;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.common.exception.ResourceOwnershipException;
import com.interviewforge.backend.resume.exception.ResumeNotReadyException;
import com.interviewforge.backend.interview.repository.InterviewQuestionRepository;
import com.interviewforge.backend.interview.repository.InterviewRepository;
import com.interviewforge.backend.resume.repository.ResumeRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.interview.service.InterviewGenerationService;
import com.interviewforge.backend.interview.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final ResumeRepository resumeRepository;
    private final InterviewGenerationService interviewGenerationService;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final InterviewQuestionRepository interviewQuestionRepository;

    @Override
    @Transactional
    public InterviewResponse start(StartInterviewRequest request) {

        User currentUser = authenticatedUserProvider.getCurrentUser();

        Resume resume = resumeRepository.findById(request.resumeId())
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Resume not found with id: " + request.resumeId()));

        if (!resume.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceOwnershipException(
                    "You do not have access to this resume");
        }

        if (resume.getAnalysisStatus() != Resume.AnalysisStatus.COMPLETED) {
            throw new ResumeNotReadyException(
                    "Resume analysis must complete before starting an interview");
        }

        Interview interview = Interview.builder()
                .user(currentUser)
                .resume(resume)
                .targetRole(request.targetRole())
                .build();

        Interview savedInterview = interviewRepository.save(interview);

        InterviewQuestion firstQuestion =
                interviewGenerationService.generateNextQuestion(
                        savedInterview,
                        null
                );

        savedInterview.addQuestion(firstQuestion);

        // Persist the question explicitly
        InterviewQuestion persistedQuestion =
                interviewQuestionRepository.save(firstQuestion);

        // Helpful while debugging
        System.out.println("Generated Question ID = " + persistedQuestion.getId());

        return toResponse(savedInterview, persistedQuestion);
    }

    private InterviewResponse toResponse(
            Interview interview,
            InterviewQuestion currentQuestion
    ) {

        InterviewQuestionResponse questionResponse = null;

        if (currentQuestion != null) {
            questionResponse = new InterviewQuestionResponse(
                    currentQuestion.getId(),
                    currentQuestion.getSequenceNumber(),
                    currentQuestion.getQuestionText(),
                    currentQuestion.getTopic(),
                    currentQuestion.getDifficulty() != null
                            ? currentQuestion.getDifficulty().name()
                            : null
            );
        }

        return new InterviewResponse(
                interview.getId(),
                interview.getTargetRole(),
                interview.getStatus().name(),
                questionResponse
        );
    }
    @Override
    @Transactional(readOnly = true)
    public InterviewResponse getInterview(Long interviewId) {

        User currentUser = authenticatedUserProvider.getCurrentUser();

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Interview not found with id: " + interviewId));

        if (!interview.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceOwnershipException(
                    "You do not have access to this interview");
        }

        InterviewQuestion currentQuestion = interview.getQuestions()
                .stream()
                .filter(question -> question.getAnswerText() == null)
                .findFirst()
                .orElse(null);

        return toResponse(interview, currentQuestion);
    }
}