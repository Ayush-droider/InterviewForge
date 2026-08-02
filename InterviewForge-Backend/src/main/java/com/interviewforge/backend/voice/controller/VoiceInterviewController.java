package com.interviewforge.backend.voice.controller;

import com.interviewforge.backend.voice.dto.VoiceMessage;
import com.interviewforge.backend.voice.dto.VoiceResponse;
import com.interviewforge.backend.voice.service.VoiceInterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class VoiceInterviewController {

    private final VoiceInterviewService voiceInterviewService;

    @MessageMapping("/interview/message")
    @SendTo("/topic/interview")
    public VoiceResponse processMessage(VoiceMessage message) {

        return voiceInterviewService.process(message);

    }
}