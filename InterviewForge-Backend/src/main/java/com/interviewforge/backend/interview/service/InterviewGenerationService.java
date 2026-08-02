package com.interviewforge.backend.interview.service;

import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.interview.entity.InterviewQuestion;

public interface InterviewGenerationService {
    InterviewQuestion generateNextQuestion(Interview interview, InterviewQuestion followUpParent);
    boolean shouldFollowUp(InterviewQuestion answeredQuestion);
}