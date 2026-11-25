package com.careerpilot.service;

import com.careerpilot.model.JobApplication;
import com.careerpilot.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository repository;

    public JobApplication addJob(JobApplication jobApplication) {
        return repository.save(jobApplication);
    }

    public List<JobApplication> getAllJobs() {
        return repository.findAll();
    }

    public JobApplication updateJob(Long id, JobApplication updatedJob) {
        JobApplication existingJob = repository.findById(id).orElse(null);

        if (existingJob != null) {
            existingJob.setCompany(updatedJob.getCompany());
            existingJob.setRole(updatedJob.getRole());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setAppliedDate(updatedJob.getAppliedDate());
            existingJob.setStatus(updatedJob.getStatus());
            existingJob.setJobLink(updatedJob.getJobLink());
            existingJob.setNotes(updatedJob.getNotes());

            return repository.save(existingJob);
        }

        return null;
    }
    public String deleteJob(Long id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Job Deleted Successfully";
        }

        return "Job Not Found";
    }

    public List<JobApplication> findByCompany(String company) {
        return repository.findByCompany(company);
    }
    public List<JobApplication> findByStatus(String status) {
        return repository.findByStatus(status);
    }
    public List<JobApplication> findByRole(String role){
        return repository.findByRole(role);
    }

   public JobApplication getJobById(Long id){
        return repository.findById(id).orElse(null);
   }
   public List<JobApplication> sortByAppliedDate(){
        return repository.findAll(Sort.by(Sort.Direction.DESC,"appliedDate"));
   }
}
