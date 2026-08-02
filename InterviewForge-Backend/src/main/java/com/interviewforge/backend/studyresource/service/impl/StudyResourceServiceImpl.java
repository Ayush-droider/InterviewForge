package com.interviewforge.backend.studyresource.service.impl;

import com.interviewforge.backend.common.exception.PdfExtractionException;
import com.interviewforge.backend.resume.extraction.PdfTextExtractor;
import com.interviewforge.backend.studyresource.dto.response.StudyResourceResponse;
import com.interviewforge.backend.studyresource.entity.StudyResource;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.studyresource.mapper.StudyResourceMapper;
import com.interviewforge.backend.rag.ingestion.service.RagIngestionService;
import com.interviewforge.backend.studyresource.repository.StudyResourceRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.studyresource.service.StudyResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyResourceServiceImpl implements StudyResourceService {

    private final StudyResourceRepository studyResourceRepository;
    private final PdfTextExtractor pdfTextExtractor;
    private final RagIngestionService ragIngestionService;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final StudyResourceMapper studyResourceMapper;

    @Override
    @Transactional
    public StudyResourceResponse upload(MultipartFile file, String topic) {
        String extractedText;
        try {
            extractedText = pdfTextExtractor.extractText(file.getInputStream());
        } catch (IOException e) {
            throw new PdfExtractionException("Could not read the uploaded file");
        }

        User currentUser = authenticatedUserProvider.getCurrentUser();

        StudyResource resource = StudyResource.builder()
                .user(currentUser)
                .fileName(file.getOriginalFilename())
                .topic(topic)
                .ingestionStatus(StudyResource.IngestionStatus.PENDING)
                .build();

        StudyResource saved = studyResourceRepository.save(resource);

        ragIngestionService.ingestAsync(saved.getId(), extractedText);

        return studyResourceMapper.toResponse(saved);
    }

    @Override
    public Page<StudyResourceResponse> getMine(Pageable pageable) {
        User currentUser = authenticatedUserProvider.getCurrentUser();
        return studyResourceRepository.findAllByUserId(currentUser.getId(), pageable)
                .map(studyResourceMapper::toResponse);
    }
}