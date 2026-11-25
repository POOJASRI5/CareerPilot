package com.careerpilot.controller;

import com.careerpilot.model.Resume;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/resumes")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @Autowired
    private ResumeRepository repository;

    @Autowired
    private PdfService pdfService;


    @PostMapping
    public Resume addResume(
            @RequestParam String resumeName,
            @RequestParam String version,
            @RequestParam String uploadedDate,
            @RequestParam("file") MultipartFile file) throws IOException {

        Resume resume = new Resume();

        resume.setResumeName(resumeName);
        resume.setFileName(file.getOriginalFilename());
        resume.setVersion(version);
        resume.setUploadedDate(uploadedDate);
        resume.setFileData(file.getBytes());

        return repository.save(resume);
    }


    @GetMapping
    public List<Resume> getAllResumes() {
        return repository.findAll();
    }


    @GetMapping("/{id}")
    public Resume getResumeById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }


    @PutMapping("/{id}")
    public Resume updateResume(
            @PathVariable Long id,
            @RequestParam String resumeName,
            @RequestParam String version,
            @RequestParam String uploadedDate,
            @RequestParam(value = "file", required = false) MultipartFile file)
            throws IOException {

        Resume resume = repository.findById(id).orElse(null);

        if (resume == null) {
            return null;
        }

        resume.setResumeName(resumeName);
        resume.setVersion(version);
        resume.setUploadedDate(uploadedDate);

        // Replace PDF only if a new file was selected
        if (file != null && !file.isEmpty()) {
            resume.setFileName(file.getOriginalFilename());
            resume.setFileData(file.getBytes());
        }

        return repository.save(resume);
    }


    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Resume deleted successfully";
        }

        return "Resume not found";
    }


    @GetMapping("/{id}/text")
    public String getResumeText(@PathVariable Long id) {

        Resume resume = repository.findById(id).orElse(null);

        if (resume == null) {
            return "Resume not found";
        }

        try {
            return pdfService.extractTextFromBytes(
                    resume.getFileData()
            );

        } catch (Exception e) {
            e.printStackTrace();
            return "Error extracting resume text";
        }
    }
}