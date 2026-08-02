package com.interviewforge.backend.resume.mapper;

import com.interviewforge.backend.resume.dto.response.ResumeResponse;
import com.interviewforge.backend.resume.entity.Resume;
import org.springframework.stereotype.Component;

@Component
public class ResumeMapper {
    public ResumeResponse toResponse(Resume resume) {
        return new ResumeResponse(
                resume.getId(),
                resume.getFileName(),
                resume.getAnalysisStatus().name(),
                resume.getUploadedAt()
        );
    }
}