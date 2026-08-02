package com.interviewforge.backend.resume.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewforge.backend.resume.parsing.ResumeAnalysisResult;
import com.interviewforge.backend.resume.entity.Resume;
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

    private static final Logger log = LoggerFactory.getLogger(ResumeAnalysisServiceImpl.class);

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
            ResumeAnalysisResult result = chatClient.prompt()
                    .user(u -> u.text("""
                            Analyze the following resume text and extract the candidate's
                            skills, past roles, estimated years of experience, a concise
                            experience summary, and 3-5 suggested topics that would make
                            good technical interview subjects based on this background.

                            Resume text:
                            {resumeText}
                            """)
                            .param("resumeText", resume.getExtractedText()))
                    .call()
                    .entity(ResumeAnalysisResult.class);

            // Store extracted skills
            resume.setSkillsJson(
                    objectMapper.writeValueAsString(result.skills())
            );

            // Store suggested interview topics
            resume.setSuggestedTopicsJson(
                    objectMapper.writeValueAsString(result.suggestedInterviewTopics())
            );

            // Store experience summary
            resume.setExperienceSummary(
                    result.experienceSummary()
            );

            // Mark analysis complete
            resume.setAnalysisStatus(
                    Resume.AnalysisStatus.COMPLETED
            );

        } catch (Exception e) {
            log.error("Resume analysis failed for resume {}", resumeId, e);
            resume.setAnalysisStatus(Resume.AnalysisStatus.FAILED);
        }

        resumeRepository.save(resume);
    }
}