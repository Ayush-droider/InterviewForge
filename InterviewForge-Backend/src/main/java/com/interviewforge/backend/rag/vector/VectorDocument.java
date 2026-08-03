package com.interviewforge.backend.rag.vector;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VectorDocument {
    private Long id;
    private Long userId;
    private Long studyResourceId;
    private String topic;
    private String content;
    private Double similarity;
}