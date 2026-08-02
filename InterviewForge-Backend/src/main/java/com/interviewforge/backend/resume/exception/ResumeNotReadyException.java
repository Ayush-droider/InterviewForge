package com.interviewforge.backend.resume.exception;

public class ResumeNotReadyException extends RuntimeException {
    public ResumeNotReadyException(String message) {
        super(message);
    }
}