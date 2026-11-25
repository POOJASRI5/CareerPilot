package com.careerpilot.model;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name="job_application")
public class JobApplication {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String company;
    private String role;
    private String location;
    private LocalDate appliedDate;
    private String status;
    private String jobLink;
    private String notes;
    public JobApplication(){

    }
    public void setId(Long id){
        this.id=id;
    }
    public Long getId(){
        return id;
    }
    public void setCompany(String company){
        this.company=company;
    }

    public String getCompany(){
        return company;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getLocation(){
        return location;
    }
    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }
    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return status;
    }
    public void setJobLink(String jobLink) {
        this.jobLink = jobLink;
    }
    public String getJobLink() {
        return jobLink;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public String getNotes() {
        return notes;
    }
}
