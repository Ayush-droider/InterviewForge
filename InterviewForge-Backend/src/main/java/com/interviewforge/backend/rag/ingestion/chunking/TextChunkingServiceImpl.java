package com.interviewforge.backend.rag.ingestion.chunking;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TextChunkingServiceImpl implements TextChunkingService {

    private static final int MAX_CHUNK_SIZE = 1000;

    @Override
    public List<String> chunk(String text) {

        List<String> chunks = new ArrayList<>();

        if (text == null || text.isBlank()) {
            return chunks;
        }

        text = text.replace("\r", "")
                .replaceAll("[ \t]+", " ")
                .trim();

        String[] paragraphs = text.split("\\n\\s*\\n");

        StringBuilder current = new StringBuilder();

        for (String paragraph : paragraphs) {

            paragraph = paragraph.trim();

            if (paragraph.isEmpty()) {
                continue;
            }

            if (current.length() + paragraph.length() <= MAX_CHUNK_SIZE) {

                if (!current.isEmpty()) {
                    current.append("\n\n");
                }

                current.append(paragraph);

            } else {

                if (!current.isEmpty()) {
                    chunks.add(current.toString());
                    current.setLength(0);
                }

                if (paragraph.length() <= MAX_CHUNK_SIZE) {

                    current.append(paragraph);

                } else {

                    splitLargeParagraph(paragraph, chunks);
                }
            }
        }

        if (!current.isEmpty()) {
            chunks.add(current.toString());
        }

        return chunks;
    }

    private void splitLargeParagraph(String paragraph,
                                     List<String> chunks) {

        String[] sentences = paragraph.split("(?<=[.!?])\\s+");

        StringBuilder current = new StringBuilder();

        for (String sentence : sentences) {

            if (current.length() + sentence.length() <= MAX_CHUNK_SIZE) {

                if (!current.isEmpty()) {
                    current.append(' ');
                }

                current.append(sentence);

            } else {

                if (!current.isEmpty()) {
                    chunks.add(current.toString());
                    current.setLength(0);
                }

                current.append(sentence);
            }
        }

        if (!current.isEmpty()) {
            chunks.add(current.toString());
        }
    }
}