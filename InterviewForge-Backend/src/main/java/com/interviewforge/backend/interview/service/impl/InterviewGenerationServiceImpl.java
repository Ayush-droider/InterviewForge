package com.interviewforge.backend.interview.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.ai.parsing.GeneratedQuestion;
import com.interviewforge.backend.common.config.properties.InterviewProperties;
import com.interviewforge.backend.interview.entity.Interview;
import com.interviewforge.backend.interview.entity.InterviewQuestion;
import com.interviewforge.backend.resume.entity.Resume;
import com.interviewforge.backend.rag.retrieval.RagRetrievalService;
import com.interviewforge.backend.interview.service.InterviewGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewGenerationServiceImpl implements InterviewGenerationService {

    private final ChatClient chatClient;
    private final RagRetrievalService ragRetrievalService;
    private final ObjectMapper objectMapper;
    private final InterviewProperties interviewProperties;

    @Override
    public InterviewQuestion generateNextQuestion(
            Interview interview,
            InterviewQuestion followUpParent
    ) {

        Resume resume = interview.getResume();

        String candidateTopic = followUpParent != null
                ? followUpParent.getTopic()
                : pickNextTopic(resume, interview);

        String retrievalQuery =
                interview.getTargetRole() + " interview question about " + candidateTopic;

        List<String> retrievedChunks = ragRetrievalService.retrieveForUser(
                retrievalQuery,
                interview.getUser().getId()
        );

        String ragContext = String.join("\n---\n", retrievedChunks);

        String alreadyAskedTopics = interview.getQuestions().stream()
                .map(InterviewQuestion::getTopic)
                .filter(topic -> topic != null)
                .distinct()
                .reduce((a, b) -> a + ", " + b)
                .orElse("");

        GeneratedQuestion generated = chatClient.prompt()
                .user(u -> u.text("""
                        You are conducting a technical interview for the role: {targetRole}.

                        Candidate's background summary:
                        {experienceSummary}

                        Focus this question on the topic:
                        {topic}

                        Relevant study material:

                        {ragContext}

                        Topics already covered:

                        {alreadyAsked}

                        {followUpInstruction}

                        Generate EXACTLY one interview question.

                        Return JSON only.

                        difficulty MUST be exactly one of:

                        EASY
                        MEDIUM
                        HARD

                        Do not use values like Beginner, Intermediate,
                        Moderate, Expert or Advanced.
                        """)
                        .param("targetRole", interview.getTargetRole())
                        .param("experienceSummary", resume.getExperienceSummary())
                        .param("topic", candidateTopic)
                        .param("ragContext",
                                ragContext.isBlank()
                                        ? ""
                                        : ragContext)
                        .param("alreadyAsked",
                                alreadyAskedTopics.isBlank()
                                        ? "None"
                                        : alreadyAskedTopics)
                        .param("followUpInstruction",
                                followUpParent != null
                                        ? "Generate a follow-up question based on the candidate's previous answer: \""
                                        + followUpParent.getAnswerText() + "\""
                                        : "Generate a fresh interview question."))
                .call()
                .entity(GeneratedQuestion.class);

        validateGeneratedQuestion(generated);

        int nextSequence = interview.getQuestions().size() + 1;

        return InterviewQuestion.builder()
                .interview(interview)
                .parentQuestion(followUpParent)
                .sequenceNumber(nextSequence)
                .questionText(generated.questionText())
                .topic(generated.topic())
                .difficulty(mapDifficulty(generated.difficulty()))
                .build();
    }

    private void validateGeneratedQuestion(GeneratedQuestion generated) {

        if (generated == null) {
            throw new IllegalStateException("Gemini returned a null response.");
        }

        if (generated.questionText() == null || generated.questionText().isBlank()) {
            throw new IllegalStateException("Gemini did not generate a valid question.");
        }

        if (generated.topic() == null || generated.topic().isBlank()) {
            throw new IllegalStateException("Gemini did not generate a valid topic.");
        }
    }

    private InterviewQuestion.Difficulty mapDifficulty(String difficulty) {

        if (difficulty == null || difficulty.isBlank()) {
            return InterviewQuestion.Difficulty.MEDIUM;
        }

        return switch (difficulty.trim().toUpperCase()) {

            case "EASY", "BEGINNER", "BASIC" ->
                    InterviewQuestion.Difficulty.EASY;

            case "HARD", "ADVANCED", "EXPERT" ->
                    InterviewQuestion.Difficulty.HARD;

            case "MEDIUM",
                 "INTERMEDIATE",
                 "MODERATE" ->
                    InterviewQuestion.Difficulty.MEDIUM;

            default -> {
                System.out.println(
                        "Unknown AI difficulty: "
                                + difficulty
                                + ". Falling back to MEDIUM."
                );
                yield InterviewQuestion.Difficulty.MEDIUM;
            }
        };
    }

    private String pickNextTopic(Resume resume, Interview interview) {

        List<String> suggestedTopics = parseTopics(resume);

        int askedCount = interview.getQuestions().size();

        if (suggestedTopics.isEmpty()) {
            return interview.getTargetRole();
        }

        return suggestedTopics.get(askedCount % suggestedTopics.size());
    }

    private List<String> parseTopics(Resume resume) {

        try {
            return objectMapper.readValue(
                    resume.getSuggestedTopicsJson(),
                    new TypeReference<List<String>>() {
                    }
            );
        } catch (Exception e) {
            return List.of();
        }
    }

    public boolean shouldFollowUp(InterviewQuestion answeredQuestion) {

        int depth = computeFollowUpChainDepth(answeredQuestion);

        if (depth >= interviewProperties.getFollowUp().getMaxDepth()) {
            return false;
        }

        Integer score = answeredQuestion.getScore();

        if (score == null) {
            return false;
        }

        return score >= interviewProperties.getFollowUp().getLowerScore()
                && score <= interviewProperties.getFollowUp().getUpperScore();
    }

    private int computeFollowUpChainDepth(InterviewQuestion question) {

        int depth = 0;

        InterviewQuestion current = question;

        while (current.getParentQuestion() != null) {
            depth++;
            current = current.getParentQuestion();
        }

        return depth;
    }
}