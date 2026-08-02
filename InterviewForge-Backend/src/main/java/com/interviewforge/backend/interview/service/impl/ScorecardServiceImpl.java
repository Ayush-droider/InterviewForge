package com.interviewforge.backend.interview.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.ai.parsing.AnswerEvaluation;
import com.interviewforge.backend.interview.dto.response.DimensionBreakdown;
import com.interviewforge.backend.interview.dto.response.InterviewQuestionResponse;
import com.interviewforge.backend.interview.dto.response.ScorecardResponse;
import com.interviewforge.backend.interview.dto.response.TopicBreakdown;
import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.interview.entity.InterviewQuestion;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.common.exception.ResourceOwnershipException;
import com.interviewforge.backend.interview.exception.ScorecardNotAvailableException;
import com.interviewforge.backend.interview.repository.InterviewRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.interview.service.ScorecardService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScorecardServiceImpl implements ScorecardService {

    private final InterviewRepository interviewRepository;
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    @Transactional
    public void generateFinalFeedback(Interview interview) {
        String transcript = interview.getQuestions().stream()
                .map(q -> "Q: " + q.getQuestionText() + "\nA: " + q.getAnswerText()
                        + "\nScore: " + q.getScore())
                .collect(Collectors.joining("\n\n"));

        List<Integer> scores = interview.getQuestions().stream()
                .map(InterviewQuestion::getScore)
                .filter(Objects::nonNull)
                .toList();

        int overallScore = scores.isEmpty() ? 0
                : (int) Math.round(scores.stream().mapToInt(Integer::intValue).average().orElse(0));

        String feedback = chatClient.prompt()
                .user(u -> u.text("""
                        Here is a full technical interview transcript for a {targetRole} candidate,
                        with per-question scores out of 100:

                        {transcript}

                        Write a concise (4-6 sentence) overall performance summary. Mention
                        genuine strengths, areas to improve, and be constructive and encouraging
                        while remaining honest about weaknesses.
                        """)
                        .param("targetRole", interview.getTargetRole())
                        .param("transcript", transcript))
                .call()
                .content();

        interview.setOverallScore(overallScore);
        interview.setOverallFeedback(feedback);
        interviewRepository.save(interview);
    }

    @Override
    @Transactional(readOnly = true)
    public ScorecardResponse getScorecard(Long interviewId) {
        User currentUser = authenticatedUserProvider.getCurrentUser();

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new NoSuchElementException("Interview not found with id: " + interviewId));

        if (!interview.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceOwnershipException("You do not have access to this interview");
        }

        if (interview.getStatus() != Interview.Status.COMPLETED) {
            throw new ScorecardNotAvailableException("Scorecard is only available for completed interviews");
        }

        List<InterviewQuestion> questions = interview.getQuestions();

        return new ScorecardResponse(
                interview.getId(),
                interview.getTargetRole(),
                interview.getOverallScore() != null ? interview.getOverallScore() : 0,
                interview.getOverallFeedback(),
                computeDimensionBreakdown(questions),
                computeTopicBreakdowns(questions),
                questions.stream().map(this::toQuestionResponse).toList()
        );
    }

    private DimensionBreakdown computeDimensionBreakdown(List<InterviewQuestion> questions) {
        List<AnswerEvaluation> evaluations = questions.stream()
                .map(this::parseEvaluation)
                .filter(Objects::nonNull)
                .toList();

        if (evaluations.isEmpty()) {
            return new DimensionBreakdown(0, 0, 0);
        }

        double avgTechnical = evaluations.stream().mapToInt(AnswerEvaluation::technicalAccuracy).average().orElse(0);
        double avgCommunication = evaluations.stream().mapToInt(AnswerEvaluation::communicationClarity).average().orElse(0);
        double avgCompleteness = evaluations.stream().mapToInt(AnswerEvaluation::completeness).average().orElse(0);

        return new DimensionBreakdown(
                round1(avgTechnical), round1(avgCommunication), round1(avgCompleteness));
    }

    private List<TopicBreakdown> computeTopicBreakdowns(List<InterviewQuestion> questions) {
        Map<String, List<Integer>> scoresByTopic = questions.stream()
                .filter(q -> q.getTopic() != null && q.getScore() != null)
                .collect(Collectors.groupingBy(
                        InterviewQuestion::getTopic,
                        Collectors.mapping(InterviewQuestion::getScore, Collectors.toList())));

        return scoresByTopic.entrySet().stream()
                .map(entry -> new TopicBreakdown(
                        entry.getKey(),
                        round1(entry.getValue().stream().mapToInt(Integer::intValue).average().orElse(0)),
                        entry.getValue().size()))
                .sorted(Comparator.comparing(TopicBreakdown::averageScore))
                .toList();
    }

    private AnswerEvaluation parseEvaluation(InterviewQuestion question) {
        if (question.getEvaluationDetailsJson() == null) {
            return null;
        }
        try {
            return objectMapper.readValue(question.getEvaluationDetailsJson(), AnswerEvaluation.class);
        } catch (Exception e) {
            return null;
        }
    }

    private double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }

    private InterviewQuestionResponse toQuestionResponse(InterviewQuestion q) {
        return new InterviewQuestionResponse(
                q.getId(), q.getSequenceNumber(), q.getQuestionText(), q.getTopic(),
                q.getDifficulty() != null ? q.getDifficulty().name() : null);
    }
}