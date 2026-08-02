package com.interviewforge.backend.resume.entity;

import com.interviewforge.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable =false)
    private User user;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false,columnDefinition = "LONGTEXT")
    private String extractedText;

    @Column(columnDefinition = "LONGTEXT")
    private String skillsJson;

    @Column(columnDefinition = "LONGTEXT")
    private String experienceSummary;

    @Column(columnDefinition = "LONGTEXT")
    private String suggestedTopicsJson;

    private Integer resumeScore;

    private Integer atsScore;

    @Column(columnDefinition = "LONGTEXT")
    private String strengths;

    @Column(columnDefinition = "LONGTEXT")
    private String weaknesses;

    @Column(columnDefinition = "LONGTEXT")
    private String recommendations;

    @Column(columnDefinition = "LONGTEXT")
    private String missingKeywords;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private AnalysisStatus analysisStatus = AnalysisStatus.PENDING;

    @Column(nullable = false,updatable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    public void onCreate() {
        uploadedAt = LocalDateTime.now();
    }

    public enum AnalysisStatus {
        PENDING,
        ANALYZING,
        COMPLETED,
        FAILED
    }
}