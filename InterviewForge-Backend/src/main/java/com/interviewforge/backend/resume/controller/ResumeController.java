package com.interviewforge.backend.resume.controller;

import com.interviewforge.backend.resume.dto.response.ResumeResponse;
import com.interviewforge.backend.resume.service.ResumeAnalysisService;
import com.interviewforge.backend.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeAnalysisService resumeAnalysisService;
    private final ResumeService resumeService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ResumeResponse> upload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeService.upload(file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getById(id));
    }

    @GetMapping
    public ResponseEntity<Page<ResumeResponse>> getMyResumes(
            @PageableDefault(size = 10, sort = "uploadedAt") Pageable pageable
    ) {
        return ResponseEntity.ok(resumeService.getMyResumes(pageable));
    }

    // Corrected version, calling back into ResumeService for the ownership check
    @PostMapping("/{id}/analyze")
    public ResponseEntity<Void> analyze(@PathVariable Long id) {
        resumeService.getById(id); // enforces ownership; throws if not found or not owned
        resumeAnalysisService.analyzeAsync(id);
        return ResponseEntity.accepted().build();
    }
}