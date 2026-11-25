package com.careerpilot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class GroqService {

    @Value("${GROQ_API_KEY}")
    private String groqApiKey;

    private final String GROQ_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    public String generateCoverLetter(
            String company,
            String role,
            String resumeText) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        String prompt =
                "Create a professional and personalized cover letter using the resume information below.\n\n" +

                        "COMPANY: " + company + "\n" +
                        "JOB ROLE: " + role + "\n\n" +

                        "RESUME INFORMATION:\n" +
                        resumeText + "\n\n" +

                        "IMPORTANT INSTRUCTIONS:\n" +
                        "1. Extract the candidate's name from the resume and use the actual name.\n" +
                        "2. Use relevant skills, projects, education and experience from the resume.\n" +
                        "3. Select only information relevant to the job role.\n" +
                        "4. Do not invent any skills, experience, projects or achievements.\n" +
                        "5. Do not use placeholders such as [Your Name], [Your Email] or [Your Phone].\n" +
                        "6. If contact information is available in the resume, use it.\n" +
                        "7. Keep the letter professional and concise.\n" +
                        "8. Use this structure:\n\n" +

                        "Candidate Name\n" +
                        "Contact Information\n\n" +

                        "Date\n\n" +

                        "Hiring Manager\n" +
                        company + "\n\n" +

                        "Subject: Application for " + role + "\n\n" +

                        "Dear Hiring Manager,\n\n" +

                        "Write 4-5 personalized paragraphs based on the resume.\n\n" +

                        "Thank you for considering my application. " +
                        "I would welcome the opportunity to discuss my qualifications further.\n\n" +

                        "Sincerely,\n" +
                        "Candidate Name\n\n" +

                        "Do not add explanations before or after the cover letter.";

        Map<String, Object> message = new HashMap<>();

        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> request = new HashMap<>();

        request.put("model", "openai/gpt-oss-120b");
        request.put("messages", List.of(message));
        request.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        GROQ_URL,
                        entity,
                        Map.class
                );

        Map body = response.getBody();

        List choices = (List) body.get("choices");

        Map firstChoice = (Map) choices.get(0);

        Map messageResponse =
                (Map) firstChoice.get("message");

        return messageResponse.get("content").toString();
    }
    public String generateInterviewCoachResponse(
            com.careerpilot.model.Interview interview,
            String resumeText,
            String mode,
            String userMessage,
            String conversationHistory) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);


        // ============================
        // INTERVIEW DETAILS
        // ============================

        String company =
                interview.getCompany() != null
                        ? interview.getCompany()
                        : "Not specified";

        String role =
                interview.getRole() != null
                        ? interview.getRole()
                        : "Not specified";

        String round =
                interview.getInterviewRound() != null
                        ? interview.getInterviewRound()
                        : "Not specified";


        // ============================
        // PREVIOUS INTERVIEW INSIGHTS
        // ============================

        String previousExperience =
                interview.getExperience() != null
                        ? interview.getExperience()
                        : "No previous experience recorded.";

        String questionsAsked =
                interview.getQuestionsAsked() != null
                        ? interview.getQuestionsAsked()
                        : "No previous questions recorded.";

        String strengths =
                interview.getStrengths() != null
                        ? interview.getStrengths()
                        : "No strengths recorded.";

        String areasToImprove =
                interview.getAreasToImprove() != null
                        ? interview.getAreasToImprove()
                        : "No weak areas recorded.";

        String interviewerFeedback =
                interview.getInterviewerFeedback() != null
                        ? interview.getInterviewerFeedback()
                        : "No interviewer feedback recorded.";

        String takeaways =
                interview.getTakeaways() != null
                        ? interview.getTakeaways()
                        : "No takeaways recorded.";

        String modeInstruction;

        if (mode.equalsIgnoreCase("Role Preparation")) {

            modeInstruction =
                    "ROLE PREPARATION MODE:\n" +
                            "Create a personalized preparation plan for this specific " +
                            "company, role and interview round.\n" +
                            "Identify the most important technical and role-specific topics " +
                            "the candidate should study.\n" +
                            "Prioritize the topics from high to low importance.\n" +
                            "For each topic, briefly explain what to learn and what kind of " +
                            "interview questions may be asked.\n" +
                            "Use the candidate's resume to connect topics with their existing skills.\n" +
                            "Do NOT conduct a mock interview and do NOT ask one question at a time.\n" +
                            "Give a structured study plan instead.";

        } else if (mode.equalsIgnoreCase("Weak Areas")) {

            modeInstruction =
                    "WEAK AREAS MODE:\n" +
                            "Use the candidate's previous interview insights to identify " +
                            "their weakest technical and communication areas.\n" +

                            "Pay special attention to Areas To Improve, " +
                            "Interviewer Feedback, Questions Previously Asked, " +
                            "and Takeaways.\n" +

                            "Prioritize the most important weaknesses for the current " +
                            "company, role and interview round.\n" +

                            "Do not give generic preparation advice.\n" +

                            "Explain why each weak area matters for this interview " +
                            "and what the candidate should study or practice.\n" +

                            "Then ask ONE targeted practice question based on the " +
                            "highest-priority weak area.\n" +

                            "After the candidate answers, evaluate the answer briefly, " +
                            "explain what was good and what needs improvement, and " +
                            "then ask another targeted question.\n" +

                            "Do not repeat questions that have already been asked.";
        }

         else if (mode.equalsIgnoreCase("Quick Questions")) {

            modeInstruction =
                    "QUICK QUESTIONS MODE:\n" +
                            "Give short rapid-fire interview questions relevant to the role.\n" +
                            "Ask only one question at a time.\n" +
                            "After the candidate answers, give very brief feedback and ask the next question.";

        } else {

            modeInstruction =
                    "MOCK INTERVIEW MODE:\n" +
                            "Conduct a realistic interview.\n" +
                            "Ask one question at a time.\n" +
                            "After the candidate answers, give brief feedback and then ask the next relevant question.";
        }
        // ============================
        // AI PROMPT
        // ============================

        String prompt =

                "You are CareerPilot AI Interview Coach.\n\n" +

                        "Your job is to help a candidate prepare specifically " +
                        "for their upcoming interview.\n\n" +

                        "INTERVIEW DETAILS:\n" +
                        "Company: " + company + "\n" +
                        "Role: " + role + "\n" +
                        "Interview Round: " + round + "\n\n" +

                        "SELECTED PREPARATION MODE:\n" +
                        mode + "\n\n" +

                        modeInstruction + "\n\n" +

                        "CANDIDATE RESUME:\n" +
                        resumeText + "\n\n" +

                        "PREVIOUS INTERVIEW INSIGHTS:\n" +

                        "Experience:\n" +
                        previousExperience + "\n\n" +

                        "Questions Previously Asked:\n" +
                        questionsAsked + "\n\n" +

                        "Strengths:\n" +
                        strengths + "\n\n" +

                        "Areas To Improve:\n" +
                        areasToImprove + "\n\n" +

                        "Interviewer Feedback:\n" +
                        interviewerFeedback + "\n\n" +

                        "Takeaways:\n" +
                        takeaways + "\n\n" +

                        "PREVIOUS CONVERSATION:\n" +
                        conversationHistory + "\n\n" +

                        "CANDIDATE'S CURRENT MESSAGE:\n" +
                        userMessage + "\n\n" +

                        "IMPORTANT RULES:\n" +

                        "1. Personalize your response using the company, role, " +
                        "interview round and resume.\n" +

                        "2. Use previous interview insights when available.\n" +

                        "3. Do not invent candidate experience or skills.\n" +

                        "4. For Mock Interview mode, ask one interview question " +
                        "at a time and wait for the candidate's answer.\n" +

                        "5. For Role Preparation mode, explain important topics " +
                        "the candidate should study for this role.\n" +

                        "6. For Weak Areas mode, focus on the candidate's " +
                        "recorded weak areas.\n" +

                        "7. For Quick Questions mode, give short rapid-fire " +
                        "questions one at a time.\n" +

                        "8. If the candidate answers a question, evaluate the " +
                        "answer briefly, explain what was good and what can be " +
                        "improved, then ask the next relevant question.\n" +

                        "9. Keep responses practical and interview-focused.\n" +

                        "10. Do not mention that you are an AI model.\n" +

                        "11. Maintain continuity with the previous conversation. " +
                        "Remember questions already asked and answers already given. " +
                        "Do not unnecessarily repeat the same question.\n";


        // ============================
        // MESSAGE
        // ============================

        Map<String, Object> message =
                new HashMap<>();

        message.put("role", "user");
        message.put("content", prompt);


        // ============================
        // GROQ REQUEST
        // ============================

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "model",
                "openai/gpt-oss-120b"
        );

        request.put(
                "messages",
                List.of(message)
        );

        request.put(
                "temperature",
                0.7
        );


        // ============================
        // SEND REQUEST
        // ============================

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(
                        request,
                        headers
                );


        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        GROQ_URL,
                        entity,
                        Map.class
                );


        // ============================
        // READ RESPONSE
        // ============================

        Map body =
                response.getBody();

        if (body == null) {
            return "AI did not return a response.";
        }


        List choices =
                (List) body.get("choices");

        if (choices == null ||
                choices.isEmpty()) {

            return "AI did not return a response.";
        }


        Map firstChoice =
                (Map) choices.get(0);


        Map messageResponse =
                (Map) firstChoice.get(
                        "message"
                );


        return messageResponse
                .get("content")
                .toString();
    }
}