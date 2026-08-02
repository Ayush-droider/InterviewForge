package com.interviewforge.backend.common.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "interview")
public class InterviewProperties {
    private int maxQuestions;
    private FollowUp followUp = new FollowUp();

    @Getter
    @Setter
    public static class FollowUp {
        private int maxDepth;
        private int lowerScore;
        private int upperScore;
    }
}