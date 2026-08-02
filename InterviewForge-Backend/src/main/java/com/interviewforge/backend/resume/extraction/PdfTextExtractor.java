package com.interviewforge.backend.resume.extraction;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import com.interviewforge.backend.common.exception.PdfExtractionException;

@Component
public class PdfTextExtractor {

    private static final int MIN_MEANINGFUL_TEXT_LENGTH = 50;

    public String extractText(InputStream pdfInputStream) {
        try (PDDocument document = Loader.loadPDF(pdfInputStream.readAllBytes())) {

            if (document.isEncrypted()) {
                throw new PdfExtractionException(
                        "This PDF is password-protected. Please upload an unprotected file.");
            }

            PDFTextStripper stripper = new PDFTextStripper();
            String extracted = stripper.getText(document);

            if (extracted == null || extracted.trim().length() < MIN_MEANINGFUL_TEXT_LENGTH) {
                throw new PdfExtractionException(
                        "Could not extract readable text from this PDF. It may be a scanned " +
                                "image without a text layer — please upload a text-based PDF.");
            }

            return extracted.trim();

        } catch (IOException e) {
            throw new PdfExtractionException(
                    "This file could not be read as a valid PDF. It may be corrupted.");
        }
    }
}