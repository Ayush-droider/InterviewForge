package com.interviewforge.backend.resume.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.resume.entity.Resume;
import com.interviewforge.backend.resume.parsing.ResumeAnalysisResult;
import com.interviewforge.backend.resume.repository.ResumeRepository;
import com.interviewforge.backend.resume.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisServiceImpl implements ResumeAnalysisService {

    private static final Logger log =
            LoggerFactory.getLogger(ResumeAnalysisServiceImpl.class);

    private final ResumeRepository resumeRepository;
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    @Override
    @Async
    @Transactional
    public void analyzeAsync(Long resumeId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new NoSuchElementException("Resume not found with id: " + resumeId));

        resume.setAnalysisStatus(Resume.AnalysisStatus.ANALYZING);
        resumeRepository.save(resume);

        try {

            String response = chatClient.prompt()
                    .user(u -> u.text("""
You are an expert ATS Resume Analyzer and Technical Interview Coach.

Analyze the following resume.

Return ONLY valid JSON.

The JSON response MUST contain these fields:

- resumeScore (integer 0-100)
- atsScore (integer 0-100)
- skills (array of technical skills)
- pastRoles (array)
- estimatedYearsOfExperience (integer)
- experienceSummary (string)
- strengths (array of 3-5 points)
- weaknesses (array of 3-5 points)
- recommendations (array)
- missingKeywords (array)
- suggestedInterviewTopics (array)

Do not return markdown.
Do not wrap the JSON inside ```json.
Return only the JSON object.

Resume:

{resumeText}
""")
                            .param("resumeText", resume.getExtractedText()))
                    .call()
                    .content();

            System.out.println("\n================ RAW AI RESPONSE ================\n");
            System.out.println(response);
            System.out.println("\n=================================================\n");

            ResumeAnalysisResult result =
                    objectMapper.readValue(response, ResumeAnalysisResult.class);

            resume.setResumeScore(result.resumeScore());
            resume.setAtsScore(result.atsScore());

            resume.setSkillsJson(
                    objectMapper.writeValueAsString(result.skills())
            );

            resume.setExperienceSummary(
                    result.experienceSummary()
            );

            resume.setSuggestedTopicsJson(
                    objectMapper.writeValueAsString(result.suggestedInterviewTopics())
            );

            resume.setStrengths(
                    objectMapper.writeValueAsString(result.strengths())
            );

            resume.setWeaknesses(
                    objectMapper.writeValueAsString(result.weaknesses())
            );

            resume.setRecommendations(
                    objectMapper.writeValueAsString(result.recommendations())
            );

            resume.setMissingKeywords(
                    objectMapper.writeValueAsString(result.missingKeywords())
            );

            resume.setAnalysisStatus(Resume.AnalysisStatus.COMPLETED);

        } catch (Exception e) {

            log.error("Resume analysis failed for resume {}", resumeId, e);

            resume.setAnalysisStatus(Resume.AnalysisStatus.FAILED);
        }

        resumeRepository.save(resume);
    }
}