package com.careerpilot.service;

import com.careerpilot.model.Resume;
import com.careerpilot.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository repository;

    public Resume addResume(Resume resume) {
        return repository.save(resume);
    }

    public List<Resume> getAllResumes() {
        return repository.findAll();
    }

    public Resume getResumeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Resume updateResume(Long id, Resume updatedResume) {

        Resume existingResume = repository.findById(id).orElse(null);

        if (existingResume != null) {

            existingResume.setResumeName(updatedResume.getResumeName());
            existingResume.setFileName(updatedResume.getFileName());
            existingResume.setVersion(updatedResume.getVersion());
            existingResume.setUploadedDate(updatedResume.getUploadedDate());

            return repository.save(existingResume);
        }

        return null;
    }

    public String deleteResume(Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Resume deleted successfully";
        }

        return "Resume not found";
    }
}
