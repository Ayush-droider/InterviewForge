package com.interviewforge.backend.interview.repository;

import com.interviewforge.backend.interview.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    Page<Interview> findAllByUserIdOrderByStartedAtDesc(Long userId, Pageable pageable);
}