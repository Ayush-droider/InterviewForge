package com.interviewforge.backend.interview.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.ai.parsing.AnswerEvaluation;
import com.interviewforge.backend.common.config.properties.InterviewProperties;
import com.interviewforge.backend.interview.dto.request.SubmitAnswerRequest;
import com.interviewforge.backend.interview.dto.response.InterviewQuestionResponse;
import com.interviewforge.backend.interview.dto.response.InterviewResponse;
import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.interview.entity.InterviewQuestion;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.interview.exception.InterviewNotInProgressException;
import com.interviewforge.backend.common.exception.ResourceOwnershipException;
import com.interviewforge.backend.interview.repository.InterviewQuestionRepository;
import com.interviewforge.backend.interview.repository.InterviewRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.interview.service.AnswerEvaluationService;
import com.interviewforge.backend.interview.service.InterviewGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AnswerEvaluationServiceImpl implements AnswerEvaluationService {

    private final InterviewRepository interviewRepository;
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final InterviewGenerationService interviewGenerationService;
    private final ScorecardServiceImpl scorecardService;
    private final InterviewProperties interviewProperties;

    @Override
    @Transactional
    public InterviewResponse submitAnswer(Long interviewId, SubmitAnswerRequest request) {
        User currentUser = authenticatedUserProvider.getCurrentUser();

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new NoSuchElementException("Interview not found with id: " + interviewId));

        if (!interview.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceOwnershipException("You do not have access to this interview");
        }

        if (interview.getStatus() != Interview.Status.IN_PROGRESS) {
            throw new InterviewNotInProgressException("This interview is no longer in progress");
        }

        InterviewQuestion question = interviewQuestionRepository.findById(request.questionId())
                .orElseThrow(() -> new NoSuchElementException(
                        "Question not found with id: " + request.questionId()));

        if (!question.getInterview().getId().equals(interview.getId())) {
            throw new ResourceOwnershipException("This question does not belong to this interview");
        }

        AnswerEvaluation evaluation = evaluate(question, request.answerText());

        question.setAnswerText(request.answerText());
        question.setAiEvaluationFeedback(evaluation.feedback());
        question.setScore(computeOverallScore(evaluation));
        question.setEvaluationDetailsJson(toJson(evaluation));
        question.setStatus(InterviewQuestion.Status.ANSWERED);
        question.setAnsweredAt(LocalDateTime.now());

        interview.setLastActivityAt(LocalDateTime.now());

        InterviewQuestion nextQuestion = null;

        if (interview.getQuestions().size() < interviewProperties.getMaxQuestions()) {

            InterviewQuestion followUpParent = interviewGenerationService.shouldFollowUp(question)
                    ? question
                    : null;

            nextQuestion = interviewGenerationService.generateNextQuestion(interview, followUpParent);

// Maintain both sides of the relationship
            interview.addQuestion(nextQuestion);

// Persist the question explicitly
            nextQuestion = interviewQuestionRepository.saveAndFlush(nextQuestion);

// Helpful while debugging
            System.out.println("Generated Next Question ID = " + nextQuestion.getId());

        } else {
            interview.setStatus(Interview.Status.COMPLETED);
            interview.setCompletedAt(LocalDateTime.now());
            scorecardService.generateFinalFeedback(interview);
        }

        interviewRepository.save(interview);

        return toResponse(interview, nextQuestion);
    }

    private AnswerEvaluation evaluate(InterviewQuestion question, String answerText) {
        return chatClient.prompt()
                .user(u -> u.text("""
                        You are evaluating a candidate's answer in a technical interview.

                        Question asked: {questionText}

                        Candidate's answer: {answerText}

                        Score the answer on three dimensions, each from 0 to 10:
                        - technicalAccuracy: is the answer factually and technically correct?
                        - communicationClarity: is the explanation clear and well-structured?
                        - completeness: does it fully address the question, including edge cases
                          or trade-offs where relevant?

                        Also provide brief, constructive feedback (2-3 sentences) the candidate
                        can learn from, whether the answer was strong or weak.
                        """)
                        .param("questionText", question.getQuestionText())
                        .param("answerText", answerText))
                .call()
                .entity(AnswerEvaluation.class);
    }

    private int computeOverallScore(AnswerEvaluation evaluation) {
        double weighted = (evaluation.technicalAccuracy() * 0.5)
                + (evaluation.communicationClarity() * 0.2)
                + (evaluation.completeness() * 0.3);
        return (int) Math.round(weighted * 10);
    }

    private String toJson(AnswerEvaluation evaluation) {
        try {
            return objectMapper.writeValueAsString(evaluation);
        } catch (Exception e) {
            return "{}";
        }
    }

    private InterviewResponse toResponse(Interview interview, InterviewQuestion nextQuestion) {
        InterviewQuestionResponse questionResponse = nextQuestion != null
                ? new InterviewQuestionResponse(
                nextQuestion.getId(), nextQuestion.getSequenceNumber(),
                nextQuestion.getQuestionText(), nextQuestion.getTopic(),
                nextQuestion.getDifficulty() != null ? nextQuestion.getDifficulty().name() : null)
                : null;

        return new InterviewResponse(
                interview.getId(), interview.getTargetRole(), interview.getStatus().name(), questionResponse);
    }
}