package com.interviewforge.backend.studyresource.repository;

import com.interviewforge.backend.studyresource.entity.StudyResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyResourceRepository extends JpaRepository<StudyResource, Long> {
    Page<StudyResource> findAllByUserId(Long userId, Pageable pageable);
}