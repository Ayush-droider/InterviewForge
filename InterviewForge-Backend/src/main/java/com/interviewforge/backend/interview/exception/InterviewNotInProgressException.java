package com.interviewforge.backend.interview.exception;

public class InterviewNotInProgressException extends RuntimeException {
    public InterviewNotInProgressException(String message) {
        super(message);
    }
}