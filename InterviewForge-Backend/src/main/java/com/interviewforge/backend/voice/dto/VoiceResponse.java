package com.interviewforge.backend.voice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoiceResponse {

    private Long interviewId;

    private String sender;

    private String message;

    private boolean speak;

    private LocalDateTime timestamp;
}