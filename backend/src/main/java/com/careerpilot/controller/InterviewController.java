package com.careerpilot.controller;

import com.careerpilot.model.Interview;
import com.careerpilot.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewController {

    @Autowired
    private InterviewRepository repository;


    @PostMapping
    public Interview addInterview(@RequestBody Interview interview) {

        if (interview.getStatus() == null) {
            interview.setStatus("Upcoming");
        }

        return repository.save(interview);
    }


    @GetMapping
    public List<Interview> getAllInterviews() {

        return repository.findAll();
    }


    @GetMapping("/{id}")
    public Interview getInterview(@PathVariable Long id) {

        return repository.findById(id).orElse(null);
    }


    @PutMapping("/{id}")
    public Interview updateInterview(
            @PathVariable Long id,
            @RequestBody Interview updatedInterview) {

        Interview interview =
                repository.findById(id).orElse(null);

        if (interview == null) {
            return null;
        }

        interview.setCompany(updatedInterview.getCompany());
        interview.setRole(updatedInterview.getRole());
        interview.setInterviewDate(updatedInterview.getInterviewDate());
        interview.setInterviewTime(updatedInterview.getInterviewTime());
        interview.setInterviewRound(updatedInterview.getInterviewRound());
        interview.setInterviewType(updatedInterview.getInterviewType());
        interview.setMeetingLink(updatedInterview.getMeetingLink());
        interview.setResumeId(updatedInterview.getResumeId());
        interview.setNotes(updatedInterview.getNotes());
        interview.setStatus(updatedInterview.getStatus());
        interview.setResult(updatedInterview.getResult());

        interview.setExperience(updatedInterview.getExperience());
        interview.setQuestionsAsked(updatedInterview.getQuestionsAsked());
        interview.setStrengths(updatedInterview.getStrengths());
        interview.setAreasToImprove(updatedInterview.getAreasToImprove());
        interview.setInterviewerFeedback(
                updatedInterview.getInterviewerFeedback()
        );
        interview.setRating(updatedInterview.getRating());
        interview.setTakeaways(updatedInterview.getTakeaways());

        return repository.save(interview);
    }


    @DeleteMapping("/{id}")
    public String deleteInterview(@PathVariable Long id) {

        if (repository.existsById(id)) {

            repository.deleteById(id);

            return "Interview deleted successfully";
        }

        return "Interview not found";
    }
}