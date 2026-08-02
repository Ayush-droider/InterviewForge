package com.interviewforge.backend.resume.service.impl;

import com.interviewforge.backend.common.exception.PdfExtractionException;
import com.interviewforge.backend.resume.dto.response.ResumeResponse;
import com.interviewforge.backend.resume.extraction.PdfTextExtractor;
import com.interviewforge.backend.resume.entity.Resume;
import com.interviewforge.backend.auth.entity.User;
import com.interviewforge.backend.resume.event.ResumeUploadedEvent;
import com.interviewforge.backend.common.exception.ResourceOwnershipException;
import com.interviewforge.backend.resume.mapper.ResumeMapper;
import com.interviewforge.backend.resume.repository.ResumeRepository;
import com.interviewforge.backend.security.userdetails.AuthenticatedUserProvider;
import com.interviewforge.backend.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ResumeServiceImpl implements ResumeService {

    private static final long MAX_FILE_SIZE_BYTES = 5L * 1024 * 1024;

    private final ResumeRepository resumeRepository;
    private final PdfTextExtractor pdfTextExtractor;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final ResumeMapper resumeMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public ResumeResponse upload(MultipartFile file) {

        validateFile(file);

        String extractedText;

        try {
            extractedText = pdfTextExtractor.extractText(file.getInputStream());
        } catch (IOException e) {
            throw new PdfExtractionException("Could not read the uploaded file");
        }

        User currentUser = authenticatedUserProvider.getCurrentUser();

        Resume resume = Resume.builder()
                .user(currentUser)
                .fileName(file.getOriginalFilename())
                .extractedText(extractedText)
                .analysisStatus(Resume.AnalysisStatus.PENDING)
                .build();

        Resume saved = resumeRepository.save(resume);

        // Fire an event. AI analysis will start AFTER transaction commit.
        eventPublisher.publishEvent(new ResumeUploadedEvent(saved.getId()));

        return resumeMapper.toResponse(saved);
    }

    @Override
    public ResumeResponse getById(Long id) {
        Resume resume = loadOwnedResume(id);
        return resumeMapper.toResponse(resume);
    }

    @Override
    public Page<ResumeResponse> getMyResumes(Pageable pageable) {

        User currentUser = authenticatedUserProvider.getCurrentUser();

        return resumeRepository.findAllByUserId(currentUser.getId(), pageable)
                .map(resumeMapper::toResponse);
    }

    private Resume loadOwnedResume(Long id) {

        User currentUser = authenticatedUserProvider.getCurrentUser();

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Resume not found with id: " + id));

        if (!resume.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceOwnershipException("You do not have access to this resume");
        }

        return resume;
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new PdfExtractionException("No file was uploaded");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new PdfExtractionException("File exceeds the 5MB size limit");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.equals("application/pdf")) {
            throw new PdfExtractionException("Only PDF files are supported");
        }
    }
}