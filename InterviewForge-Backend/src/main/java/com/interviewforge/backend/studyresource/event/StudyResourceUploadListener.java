package com.interviewforge.backend.studyresource.event;

import com.interviewforge.backend.rag.ingestion.service.RagIngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class StudyResourceUploadListener {

    private final RagIngestionService ragIngestionService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onUpload(
            StudyResourceUploadedEvent event
    ) {

        ragIngestionService.ingestAsync(
                event.studyResourceId(),
                event.extractedText()
        );

    }

}