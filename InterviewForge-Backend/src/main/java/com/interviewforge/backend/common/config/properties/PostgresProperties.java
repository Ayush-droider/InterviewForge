package com.interviewforge.backend.common.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "postgres")
public class PostgresProperties {

    private String host;
    private Integer port;
    private String database;
    private String username;
    private String password;
}