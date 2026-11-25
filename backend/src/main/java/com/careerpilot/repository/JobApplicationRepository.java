package com.careerpilot.repository;

import com.careerpilot.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByCompany(String company);
    List<JobApplication> findByStatus(String status);
    List<JobApplication> findByRole(String role);

}
