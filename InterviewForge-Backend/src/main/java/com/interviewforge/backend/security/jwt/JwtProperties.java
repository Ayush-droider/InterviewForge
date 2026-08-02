package com.interviewforge.backend.security.jwt;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    private String secret;
    private long expirationMs;
    @PostConstruct
    public void init() {
        System.out.println("JWT = " + secret);
        System.out.println("Length = " + (secret == null ? 0 : secret.length()));
    }
}