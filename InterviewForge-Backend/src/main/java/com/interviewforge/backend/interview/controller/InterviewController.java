package com.interviewforge.backend.interview.controller;

import com.interviewforge.backend.interview.dto.request.StartInterviewRequest;
import com.interviewforge.backend.interview.dto.request.SubmitAnswerRequest;
import com.interviewforge.backend.interview.dto.response.InterviewResponse;
import com.interviewforge.backend.interview.dto.response.InterviewSummaryResponse;
import com.interviewforge.backend.interview.dto.response.ScorecardResponse;
import com.interviewforge.backend.interview.service.AnswerEvaluationService;
import com.interviewforge.backend.interview.service.InterviewHistoryService;
import com.interviewforge.backend.interview.service.InterviewService;
import com.interviewforge.backend.interview.service.ScorecardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final AnswerEvaluationService answerEvaluationService;
    private final ScorecardService scorecardService;
    private final InterviewHistoryService interviewHistoryService;

    @PostMapping
    public ResponseEntity<InterviewResponse> start(
            @Valid @RequestBody StartInterviewRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.start(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewResponse> getInterview(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(interviewService.getInterview(id));
    }

    @PostMapping("/{id}/answer")
    public ResponseEntity<InterviewResponse> submitAnswer(
            @PathVariable Long id,
            @Valid @RequestBody SubmitAnswerRequest request
    ) {
        return ResponseEntity.ok(
                answerEvaluationService.submitAnswer(id, request)
        );
    }

    @GetMapping("/{id}/scorecard")
    public ResponseEntity<ScorecardResponse> getScorecard(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                scorecardService.getScorecard(id)
        );
    }

    @GetMapping
    public ResponseEntity<Page<InterviewSummaryResponse>> getMyHistory(
            @PageableDefault(size = 10, sort = "startedAt") Pageable pageable
    ) {
        return ResponseEntity.ok(
                interviewHistoryService.getMyHistory(pageable)
        );
    }
}