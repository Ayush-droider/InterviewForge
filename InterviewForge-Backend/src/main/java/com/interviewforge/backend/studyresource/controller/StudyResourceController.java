package com.interviewforge.backend.studyresource.controller;

import com.interviewforge.backend.studyresource.dto.response.StudyResourceResponse;
import com.interviewforge.backend.studyresource.service.StudyResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/study-resources")
@RequiredArgsConstructor
public class StudyResourceController {

    private final StudyResourceService studyResourceService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<StudyResourceResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("topic") String topic
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studyResourceService.upload(file, topic));
    }

    @GetMapping
    public ResponseEntity<Page<StudyResourceResponse>> getMine(
            @PageableDefault(size = 10, sort = "uploadedAt") Pageable pageable
    ) {
        return ResponseEntity.ok(studyResourceService.getMine(pageable));
    }
}