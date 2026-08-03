package com.interviewforge.backend;

import com.interviewforge.backend.common.config.properties.InterviewProperties;
import com.interviewforge.backend.common.config.properties.JinaProperties;
import com.interviewforge.backend.common.config.properties.PostgresProperties;
import com.interviewforge.backend.common.config.properties.RagProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		InterviewProperties.class,
		RagProperties.class,
		JinaProperties.class,
		PostgresProperties.class
})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}