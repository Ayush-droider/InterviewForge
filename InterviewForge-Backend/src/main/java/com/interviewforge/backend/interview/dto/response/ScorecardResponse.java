package com.interviewforge.backend.interview.dto.response;

import java.util.List;

public record ScorecardResponse(
        Long interviewId,
        String targetRole,
        int overallScore,
        String overallFeedback,
        DimensionBreakdown dimensionBreakdown,
        List<TopicBreakdown> topicBreakdowns,
        List<InterviewQuestionResponse> questions
) {}