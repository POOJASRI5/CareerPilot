package com.careerpilot.controller;

import com.careerpilot.service.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cover-letter")
@CrossOrigin(origins = "http://localhost:5173")
public class CoverLetterController {

    @Autowired
    private GroqService groqService;

    @PostMapping
    public String generateCoverLetter(
            @RequestParam String company,
            @RequestParam String role,
            @RequestParam String resumeText) {

        return groqService.generateCoverLetter(
                company,
                role,
                resumeText
        );
    }
}