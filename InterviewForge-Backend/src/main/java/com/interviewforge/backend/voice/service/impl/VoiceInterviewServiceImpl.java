package com.interviewforge.backend.voice.service.impl;

import com.interviewforge.backend.voice.dto.VoiceMessage;
import com.interviewforge.backend.voice.dto.VoiceResponse;
import com.interviewforge.backend.voice.service.VoiceInterviewService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VoiceInterviewServiceImpl implements VoiceInterviewService {

    @Override
    public VoiceResponse process(VoiceMessage message) {

        return VoiceResponse.builder()
                .interviewId(message.getInterviewId())
                .sender("AI")
                .message("Received: " + message.getMessage())
                .speak(true)
                .timestamp(LocalDateTime.now())
                .build();
    }
}