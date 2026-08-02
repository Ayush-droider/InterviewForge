package com.interviewforge.backend.interview.entity;

import com.interviewforge.backend.resume.entity.Resume;
import com.interviewforge.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(nullable = false)
    private String targetRole;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Status status = Status.IN_PROGRESS;

    private Integer overallScore;

    @Column(columnDefinition = "TEXT")
    private String overallFeedback;

    @Column(nullable = false, updatable = false)
    private LocalDateTime startedAt;

    private LocalDateTime lastActivityAt;

    private LocalDateTime completedAt;

    @OneToMany(
            mappedBy = "interview",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<InterviewQuestion> questions = new ArrayList<>();

    /**
     * Maintains both sides of the relationship.
     */
    public void addQuestion(InterviewQuestion question) {
        questions.add(question);
        question.setInterview(this);
    }

    @PrePersist
    protected void onCreate() {
        this.startedAt = LocalDateTime.now();
        this.lastActivityAt = LocalDateTime.now();
    }

    public enum Status {
        IN_PROGRESS,
        COMPLETED,
        ABANDONED
    }
}