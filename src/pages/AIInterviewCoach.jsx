import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Sparkles,
    Target,
    BookOpen,
    Brain,
    Zap,
    Send,
    User,
    Bot
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = "http://localhost:8051/interviews";

function AIInterviewCoach() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedMode, setSelectedMode] =
        useState("Mock Interview");

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hi! I'm your AI Interview Coach. Once you start practicing, I'll use your interview details and previous insights to personalize your preparation."
        }
    ]);


    // ============================
    // LOAD INTERVIEW
    // ============================

    useEffect(() => {
        loadInterview();
    }, [id]);



    // ============================
// LOAD SAVED CONVERSATION
// ============================

useEffect(() => {

    if (!id) {
        return;
    }

    const savedConversation =
        localStorage.getItem(
            `aiCoachConversation_${id}`
        );

    if (savedConversation) {

        try {

            const parsedConversation =
                JSON.parse(savedConversation);

            setMessages(parsedConversation);

        } catch (error) {

            console.log(
                "Error loading saved conversation:",
                error
            );

        }
    }

}, [id]);


// ============================
// SAVE CONVERSATION
// ============================

useEffect(() => {

    if (!id || messages.length === 0) {
        return;
    }

    localStorage.setItem(
        `aiCoachConversation_${id}`,
        JSON.stringify(messages)
    );

}, [messages, id]);

    const loadInterview = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/${id}`
            );

            setInterview(response.data);

        } catch (error) {

            console.log(
                "Error loading interview:",
                error
            );

            alert("Unable to load interview.");

        } finally {

            setLoading(false);

        }
    };


    // ============================
    // SEND MESSAGE
    // ============================
const sendMessage = async () => {

    if (!message.trim()) {
        return;
    }

    const userMessage = message.trim();

    // Add user's message to the current conversation
    const updatedMessages = [
        ...messages,
        {
            sender: "user",
            text: userMessage
        }
    ];

    // Show user message immediately
    setMessages(updatedMessages);

    // Clear input
    setMessage("");

    try {

const response = await axios.post(
    `http://localhost:8051/ai-interview-coach/${id}`,
    {
        message: userMessage,
        mode: selectedMode,
        conversationHistory:
            JSON.stringify(updatedMessages)
    }
);

        // Add AI response
        setMessages((previous) => [
            ...previous,
            {
                sender: "ai",
                text: response.data
            }
        ]);

    } catch (error) {

        console.log(
            "AI Coach Error:",
            error
        );

        setMessages((previous) => [
            ...previous,
            {
                sender: "ai",
                text:
                    "Sorry, I couldn't connect to the AI Interview Coach. Please try again."
            }
        ]);
    }
};
    
// ============================
// CLEAR CONVERSATION
// ============================

const clearConversation = () => {

    if (!id) {
        return;
    }

    localStorage.removeItem(
        `aiCoachConversation_${id}`
    );

    setMessages([
        {
            sender: "ai",
            text: "Hi! I'm your AI Interview Coach. Once you start practicing, I'll use your interview details and previous insights to personalize your preparation."
        }
    ]);
};

    // ============================
    // START MODE
    // ============================

    const startMode = (mode) => {

        setSelectedMode(mode);

        let text = "";

        if (mode === "Mock Interview") {

            text =
                `Let's start your ${interview?.interviewRound || "interview"} mock interview for the ${interview?.role || "role"} position. I'll ask one question at a time.`;

        } else if (mode === "Role Preparation") {

            text =
                `Let's prepare for the ${interview?.role || "role"} position. I'll focus on the most relevant technical and role-specific topics.`;

        } else if (mode === "Weak Areas") {

            text =
                "Let's work on the areas you struggled with in your previous interview.";

        } else if (mode === "Quick Questions") {

            text =
                "Let's begin a rapid-fire interview practice session.";
        }


        setMessages((previous) => [

            ...previous,

            {
                sender: "ai",
                text: text
            }

        ]);

    };


    if (loading) {

        return (
            <div className="ai-coach-loading">
                Loading AI Interview Coach...
            </div>
        );

    }


    if (!interview) {

        return (
            <div className="ai-coach-loading">
                Interview not found.
            </div>
        );

    }


    // ============================
    // UI
    // ============================

    return (

        <div className="ai-coach-page">


            {/* ============================
                HEADER
            ============================ */}

            <div className="ai-coach-top">

                <button
                    className="back-to-interviews"
                    onClick={() =>
                        navigate("/interviews")
                    }
                >

                    <ArrowLeft size={15} />

                    Back to Interviews

                </button>


                <div className="ai-coach-header">

                    <div>

                        <div className="ai-title-row">

                            <div className="ai-title-icon">

                                <Sparkles size={21} />

                            </div>

                            <div>

                                <h1>
                                    AI Interview Coach
                                </h1>

                                <p>
                                    Prepare smarter using your
                                    resume, interview history and
                                    upcoming interview.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ============================
                INTERVIEW SUMMARY
            ============================ */}

            <div className="ai-interview-summary">

                <div>

                    <span className="ai-summary-label">
                        PREPARING FOR
                    </span>

                    <h2>
                        {interview.role}
                    </h2>

                    <p>
                        {interview.company}
                        {" • "}
                        {interview.interviewRound}
                    </p>

                </div>


                <div className="ai-interview-details">

                    <div>

                        <span>Interview Date</span>

                        <strong>
                            {interview.interviewDate}
                        </strong>

                    </div>


                    <div>

                        <span>Time</span>

                        <strong>
                            {interview.interviewTime}
                        </strong>

                    </div>


                    <div>

                        <span>Type</span>

                        <strong>
                            {interview.interviewType}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ============================
                PREPARATION PROGRESS
            ============================ */}

            <div className="ai-progress-card">

                <div className="ai-progress-header">

                    <div>

                        <span>
                            Preparation Progress
                        </span>

                        <strong>
                            60%
                        </strong>

                    </div>

                </div>


                <div className="ai-progress-bar">

                    <div
                        className="ai-progress-fill"
                        style={{
                            width: "60%"
                        }}
                    />

                </div>

            </div>


            {/* ============================
                MAIN GRID
            ============================ */}

            <div className="ai-coach-grid">


                {/* ============================
                    LEFT — CHAT
                ============================ */}

                <div className="ai-chat-card">

                    <div className="ai-chat-header">

                        <div>

                            <h2>
                                Practice with AI
                            </h2>

                            <p>
                                Your personalized interview
                                preparation assistant.
                            </p>

                        </div>

                        <div className="ai-chat-header-actions">

                             <button
                                className="clear-chat-btn"
                                onClick={clearConversation}
                             >
                             Clear Chat
                             </button>

                       <div className="online-status">
                         <span />
                         Ready
                       </div>
           </div>
             

                    </div>


                    {/* CHAT */}

                    <div
                      className={`ai-chat-messages mode-${selectedMode
                           .toLowerCase()
                           .replace(/\s+/g, "-")}`}
                    >

                        {messages.map(
                            (item, index) => (

                                <div
                                    className={
                                        item.sender === "ai"
                                            ? "chat-message ai-message"
                                            : "chat-message user-message"
                                    }
                                    key={index}
                                >

                                    {item.sender === "ai" && (

                                        <div className="chat-avatar ai-avatar">

                                            <Bot size={15} />

                                        </div>

                                    )}

                                    <div className="chat-bubble">
                                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                           {item.text}
                                         </ReactMarkdown>
                                    </div>


                                    {item.sender === "user" && (

                                        <div className="chat-avatar user-avatar">

                                            <User size={15} />

                                        </div>

                                    )}

                                </div>

                            )
                        )}

                    </div>


                    {/* INPUT */}

                    <div className="ai-chat-input">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Ask your AI Interview Coach..."
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {
                                    sendMessage();
                                }

                            }}
                        />


                        <button
                            onClick={sendMessage}
                        >

                            <Send size={17} />

                        </button>

                    </div>

                </div>


                {/* ============================
                    RIGHT — PREPARATION
                ============================ */}

                <div className="ai-preparation-column">


                    <div className="preparation-heading">

                        <h2>
                            Preparation Modes
                        </h2>

                        <p>
                            Choose how you want to practice.
                        </p>

                    </div>


                    {/* MOCK INTERVIEW */}

                    <button
                        className={
                            selectedMode === "Mock Interview"
                                ? "prep-mode active"
                                : "prep-mode"
                        }
                        onClick={() =>
                            startMode("Mock Interview")
                        }
                    >

                        <div className="prep-icon mock">

                            <Target size={18} />

                        </div>

                        <div>

                            <strong>
                                Mock Interview
                            </strong>

                            <span>
                                Practice a realistic interview
                                with AI.
                            </span>

                        </div>

                    </button>


                    {/* ROLE PREPARATION */}

                    <button
                        className={
                            selectedMode === "Role Preparation"
                                ? "prep-mode active"
                                : "prep-mode"
                        }
                        onClick={() =>
                            startMode("Role Preparation")
                        }
                    >

                        <div className="prep-icon role">

                            <BookOpen size={18} />

                        </div>

                        <div>

                            <strong>
                                Role Preparation
                            </strong>

                            <span>
                                Learn important topics
                                for this role.
                            </span>

                        </div>

                    </button>


                    {/* WEAK AREAS */}

                    <button
                        className={
                            selectedMode === "Weak Areas"
                                ? "prep-mode active"
                                : "prep-mode"
                        }
                        onClick={() =>
                            startMode("Weak Areas")
                        }
                    >

                        <div className="prep-icon weak">

                            <Brain size={18} />

                        </div>

                        <div>

                            <strong>
                                Weak Areas
                            </strong>

                            <span>
                                Practice topics you struggled
                                with previously.
                            </span>

                        </div>

                    </button>


                    {/* QUICK QUESTIONS */}

                    <button
                        className={
                            selectedMode === "Quick Questions"
                                ? "prep-mode active"
                                : "prep-mode"
                        }
                        onClick={() =>
                            startMode("Quick Questions")
                        }
                    >

                        <div className="prep-icon quick">

                            <Zap size={18} />

                        </div>

                        <div>

                            <strong>
                                Quick Questions
                            </strong>

                            <span>
                                Practice rapid-fire
                                interview questions.
                            </span>

                        </div>

                    </button>


                    {/* PREVIOUS INSIGHTS */}

                    <div className="previous-insights-card">

                        <div className="previous-insights-icon">

                            <Sparkles size={17} />

                        </div>


                        <div>

                            <h3>
                                Previous Interview Insights
                            </h3>

                            <p>
                                Use your previous interview
                                experience to focus your
                                preparation.
                            </p>


                            <button
                                onClick={() =>
                                    navigate(
                                        `/interview-insights/${interview.id}`
                                    )
                                }
                            >
                                View Insights →
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AIInterviewCoach;