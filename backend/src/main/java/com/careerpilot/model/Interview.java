package com.careerpilot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String interviewDate;
    private String interviewTime;
    private String interviewRound;
    private String interviewType;
    private String meetingLink;
    private Long resumeId;
    private String notes;

    private String status;
    private String result;

    // Interview Insights
    @Column(columnDefinition = "TEXT")
    private String experience;

    @Column(columnDefinition = "TEXT")
    private String questionsAsked;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String areasToImprove;

    @Column(columnDefinition = "TEXT")
    private String interviewerFeedback;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String takeaways;


    public Long getId() {
        return id;
    }


    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    public String getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(String interviewDate) {
        this.interviewDate = interviewDate;
    }


    public String getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(String interviewTime) {
        this.interviewTime = interviewTime;
    }


    public String getInterviewRound() {
        return interviewRound;
    }

    public void setInterviewRound(String interviewRound) {
        this.interviewRound = interviewRound;
    }


    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }


    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }


    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }


    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }


    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }


    public String getQuestionsAsked() {
        return questionsAsked;
    }

    public void setQuestionsAsked(String questionsAsked) {
        this.questionsAsked = questionsAsked;
    }


    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }


    public String getAreasToImprove() {
        return areasToImprove;
    }

    public void setAreasToImprove(String areasToImprove) {
        this.areasToImprove = areasToImprove;
    }


    public String getInterviewerFeedback() {
        return interviewerFeedback;
    }

    public void setInterviewerFeedback(String interviewerFeedback) {
        this.interviewerFeedback = interviewerFeedback;
    }


    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }


    public String getTakeaways() {
        return takeaways;
    }

    public void setTakeaways(String takeaways) {
        this.takeaways = takeaways;
    }
}