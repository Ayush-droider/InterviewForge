package com.interviewforge.backend.common.config;

import com.interviewforge.backend.common.config.properties.PostgresProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class PostgresDataSourceConfig {

    private final PostgresProperties postgresProperties;

    @Bean(name = "postgresDataSource")
    public DataSource postgresDataSource() {

        String url = String.format(
                "jdbc:postgresql://%s:%d/%s?sslmode=require",
                postgresProperties.getHost(),
                postgresProperties.getPort(),
                postgresProperties.getDatabase()
        );

        String password = postgresProperties.getPassword();

        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(url)
                .username(postgresProperties.getUsername())
                .password(password)
                .build();
    }

    @Bean(name = "postgresJdbcTemplate")
    public JdbcTemplate postgresJdbcTemplate(
            @Qualifier("postgresDataSource")
            DataSource dataSource
    ) {
        return new JdbcTemplate(dataSource);
    }
}