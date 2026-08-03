package com.interviewforge.backend.rag.vector;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Slf4j
public class VectorRepository {

    @Qualifier("postgresJdbcTemplate")
    private final JdbcTemplate jdbcTemplate;

    public void saveChunk(
            Long userId,
            Long studyResourceId,
            String topic,
            String content,
            List<Float> embedding
    ) {

        String sql = """
                INSERT INTO vector_documents
                (
                    user_id,
                    study_resource_id,
                    topic,
                    content,
                    embedding
                )
                VALUES (?, ?, ?, ?, ?::vector)
                """;

        try {

            jdbcTemplate.update(
                    sql,
                    userId,
                    studyResourceId,
                    topic,
                    content,
                    toVector(embedding)
            );

            log.debug(
                    "Saved embedding for StudyResource={}, User={}",
                    studyResourceId,
                    userId
            );

        } catch (Exception ex) {

            log.error(
                    "Failed to save embedding for StudyResource={}",
                    studyResourceId,
                    ex
            );

            throw new RuntimeException("Failed to save embedding.", ex);
        }
    }

    public List<VectorDocument> findSimilarChunks(
            Long userId,
            List<Float> embedding,
            int limit
    ) {

        String sql = """
                SELECT
                    id,
                    user_id,
                    study_resource_id,
                    topic,
                    content,
                    embedding <=> ?::vector AS similarity
                FROM vector_documents
                WHERE user_id = ?
                ORDER BY embedding <=> ?::vector
                LIMIT ?
                """;

        try {

            return jdbcTemplate.query(
                    sql,
                    (rs, rowNum) -> new VectorDocument(
                            rs.getLong("id"),
                            rs.getLong("user_id"),
                            rs.getLong("study_resource_id"),
                            rs.getString("topic"),
                            rs.getString("content"),
                            rs.getDouble("similarity")
                    ),
                    toVector(embedding),
                    userId,
                    toVector(embedding),
                    limit
            );

        } catch (Exception ex) {

            log.error(
                    "Failed to retrieve similar chunks for user={}",
                    userId,
                    ex
            );

            throw new RuntimeException("Similarity search failed.", ex);
        }
    }

    public void deleteByStudyResource(Long studyResourceId) {

        try {

            jdbcTemplate.update(
                    """
                    DELETE
                    FROM vector_documents
                    WHERE study_resource_id = ?
                    """,
                    studyResourceId
            );

            log.info(
                    "Deleted embeddings for StudyResource={}",
                    studyResourceId
            );

        } catch (Exception ex) {

            log.error(
                    "Failed to delete embeddings for StudyResource={}",
                    studyResourceId,
                    ex
            );

            throw new RuntimeException("Failed to delete embeddings.", ex);
        }
    }

    private String toVector(List<Float> embedding) {

        return embedding.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(",", "[", "]"));
    }
}