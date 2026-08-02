package com.interviewforge.backend.resume.repository;

import com.interviewforge.backend.resume.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Page<Resume> findAllByUserId(Long userId, Pageable pageable);
    List<Resume> findAllByUserIdOrderByUploadedAtDesc(Long userId);
}