package com.interviewforge.backend.studyresource.mapper;

import com.interviewforge.backend.studyresource.dto.response.StudyResourceResponse;
import com.interviewforge.backend.studyresource.entity.StudyResource;
import org.springframework.stereotype.Component;

@Component
public class StudyResourceMapper {
    public StudyResourceResponse toResponse(StudyResource resource) {
        return new StudyResourceResponse(
                resource.getId(),
                resource.getFileName(),
                resource.getTopic(),
                resource.getIngestionStatus().name(),
                resource.getUploadedAt()
        );
    }
}