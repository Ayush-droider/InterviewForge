package com.interviewforge.backend.resume.event;

import com.interviewforge.backend.resume.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
@RequiredArgsConstructor
public class ResumeAnalysisListener {

    private final ResumeAnalysisService resumeAnalysisService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleResumeUploaded(ResumeUploadedEvent event) {

        resumeAnalysisService.analyzeAsync(event.resumeId());

    }
}