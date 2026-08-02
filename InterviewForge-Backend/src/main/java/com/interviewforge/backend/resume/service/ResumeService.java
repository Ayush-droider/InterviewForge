package com.interviewforge.backend.resume.service;

import com.interviewforge.backend.resume.dto.response.ResumeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {
    ResumeResponse upload(MultipartFile file);
    ResumeResponse getById(Long id);
    Page<ResumeResponse> getMyResumes(Pageable pageable);
}