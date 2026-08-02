package com.interviewforge.backend.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoiceMessage {

    private Long interviewId;

    private Long userId;

    private String sessionId;

    /**
     * Transcript generated from speech or typed message.
     */
    private String message;

    /**
     * voice | text
     */
    private String type;
}