package com.interviewforge.backend.studyresource.service;

import com.interviewforge.backend.studyresource.dto.response.StudyResourceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface StudyResourceService {
    StudyResourceResponse upload(MultipartFile file, String topic);
    Page<StudyResourceResponse> getMine(Pageable pageable);
}