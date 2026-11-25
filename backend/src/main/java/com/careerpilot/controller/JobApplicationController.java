package com.careerpilot.controller;


import com.careerpilot.model.JobApplication;
import com.careerpilot.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/jobs")
public class JobApplicationController {
    @Autowired
    private JobApplicationService service;

    @PostMapping
    public JobApplication addJob(@RequestBody JobApplication jobApplication){
        return service.addJob(jobApplication);
    }

    @GetMapping
    public List<JobApplication> getAllJobs() {
        return service.getAllJobs();
    }

    @PutMapping("/{id}")
    public JobApplication updateJob(@PathVariable Long id,
                                    @RequestBody JobApplication jobApplication) {

        return service.updateJob(id, jobApplication);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {

        return service.deleteJob(id);
    }
    @GetMapping("/search")
    public List<JobApplication> findByCompany(@RequestParam String company) {
        return service.findByCompany(company);
    }
    @GetMapping("/filter")
    public List<JobApplication> filterByStatus(@RequestParam String status) {
        return service.findByStatus(status);
    }
    @GetMapping("/role")
    public List<JobApplication> findBYRole(@RequestParam String role){
        return service.findByRole(role);
    }
    @GetMapping("/{id}")
    public JobApplication getJobById(@PathVariable Long id){
        return service.getJobById(id);
    }
   @GetMapping("/sort")
    public List<JobApplication> sortJobs(){
        return service.sortByAppliedDate();
   }
}
