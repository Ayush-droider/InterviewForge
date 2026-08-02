package com.interviewforge.backend.voice.service;

import com.interviewforge.backend.voice.dto.VoiceMessage;
import com.interviewforge.backend.voice.dto.VoiceResponse;

public interface VoiceInterviewService {

    VoiceResponse process(VoiceMessage message);

}