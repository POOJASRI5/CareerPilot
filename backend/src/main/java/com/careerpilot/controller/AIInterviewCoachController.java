package com.careerpilot.controller;

import com.careerpilot.model.Interview;
import com.careerpilot.model.Resume;
import com.careerpilot.repository.InterviewRepository;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.service.GroqService;
import com.careerpilot.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

@RestController
@RequestMapping("/ai-interview-coach")
@CrossOrigin(origins = "http://localhost:5173")
public class AIInterviewCoachController {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private GroqService groqService;

    @PostMapping("/{id}")
    public String chatWithCoach(
            @PathVariable Long id,
            @RequestBody Map<String, String> request
    ) {

        String message = request.get("message");

        String mode = request.getOrDefault(
                "mode",
                "Mock Interview"
        );

        String conversationHistory =
                request.getOrDefault(
                        "conversationHistory",
                        ""
                );

        Interview interview =
                interviewRepository
                        .findById(id)
                        .orElse(null);

        if (interview == null) {
            return "Interview not found.";
        }

        String resumeText = "";

        if (interview.getResumeId() != null) {

            Resume resume =
                    resumeRepository
                            .findById(interview.getResumeId())
                            .orElse(null);

            if (resume != null &&
                    resume.getFileData() != null) {

                try {

                    resumeText =
                            pdfService.extractTextFromBytes(
                                    resume.getFileData()
                            );

                } catch (Exception e) {

                    e.printStackTrace();

                    resumeText =
                            "Resume text could not be extracted.";
                }
            }
        }

        return groqService.generateInterviewCoachResponse(
                interview,
                resumeText,
                mode,
                message,
                conversationHistory
        );
    }
}