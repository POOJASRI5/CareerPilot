import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    Sparkles,
    Star,
    CheckCircle2
} from "lucide-react";

import axios from "axios";

const API_URL = "http://localhost:8051/interviews";

function InterviewInsights() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [questions, setQuestions] = useState([]);

    const [newQuestion, setNewQuestion] = useState("");
    const [newCategory, setNewCategory] = useState("General");
    const [newDifficulty, setNewDifficulty] = useState("Medium");

    const [experience, setExperience] = useState("");
    const [strengths, setStrengths] = useState([]);
    const [areasToImprove, setAreasToImprove] = useState([]);
    const [takeaways, setTakeaways] = useState([]);

    const [newStrength, setNewStrength] = useState("");
    const [newWeakArea, setNewWeakArea] = useState("");
    const [newTakeaway, setNewTakeaway] = useState("");

    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [result, setResult] = useState("Waiting for Response");


    // ============================
    // LOAD INTERVIEW
    // ============================

    useEffect(() => {
        loadInterview();
    }, [id]);


    const loadInterview = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/${id}`
            );

            const data = response.data;

            setInterview(data);

            setExperience(data.experience || "");
            setFeedback(data.interviewerFeedback || "");
            setRating(data.rating || 0);
            setResult(data.result || "Waiting for Response");

            if (data.questionsAsked) {
                try {
                    setQuestions(
                        JSON.parse(data.questionsAsked)
                    );
                } catch {
                    setQuestions([]);
                }
            }

            if (data.strengths) {
                try {
                    setStrengths(
                        JSON.parse(data.strengths)
                    );
                } catch {
                    setStrengths([]);
                }
            }

            if (data.areasToImprove) {
                try {
                    setAreasToImprove(
                        JSON.parse(data.areasToImprove)
                    );
                } catch {
                    setAreasToImprove([]);
                }
            }

            if (data.takeaways) {
                try {
                    setTakeaways(
                        JSON.parse(data.takeaways)
                    );
                } catch {
                    setTakeaways([]);
                }
            }

        } catch (error) {

            console.log("Error loading interview:", error);
            alert("Unable to load interview.");

        } finally {

            setLoading(false);

        }
    };


    // ============================
    // QUESTIONS
    // ============================

    const addQuestion = () => {

        if (!newQuestion.trim()) {
            return;
        }

        const question = {
            text: newQuestion.trim(),
            category: newCategory,
            difficulty: newDifficulty
        };

        setQuestions([
            ...questions,
            question
        ]);

        setNewQuestion("");
        setNewCategory("General");
        setNewDifficulty("Medium");
    };


    const deleteQuestion = (index) => {

        setQuestions(
            questions.filter(
                (_, i) => i !== index
            )
        );
    };


    // ============================
    // TAGS
    // ============================

    const addStrength = () => {

        if (!newStrength.trim()) return;

        setStrengths([
            ...strengths,
            newStrength.trim()
        ]);

        setNewStrength("");
    };


    const removeStrength = (index) => {

        setStrengths(
            strengths.filter(
                (_, i) => i !== index
            )
        );
    };


    const addWeakArea = () => {

        if (!newWeakArea.trim()) return;

        setAreasToImprove([
            ...areasToImprove,
            newWeakArea.trim()
        ]);

        setNewWeakArea("");
    };


    const removeWeakArea = (index) => {

        setAreasToImprove(
            areasToImprove.filter(
                (_, i) => i !== index
            )
        );
    };


    const addTakeaway = () => {

        if (!newTakeaway.trim()) return;

        setTakeaways([
            ...takeaways,
            newTakeaway.trim()
        ]);

        setNewTakeaway("");
    };


    const removeTakeaway = (index) => {

        setTakeaways(
            takeaways.filter(
                (_, i) => i !== index
            )
        );
    };


    // ============================
    // SAVE
    // ============================

    const saveInsights = async () => {

        if (!interview) return;

        setSaving(true);

        try {

            const updatedInterview = {

                ...interview,

                questionsAsked:
                    JSON.stringify(questions),

                experience,

                strengths:
                    JSON.stringify(strengths),

                areasToImprove:
                    JSON.stringify(areasToImprove),

                interviewerFeedback:
                    feedback,

                rating,

                result,

                takeaways:
                    JSON.stringify(takeaways),

                status: "Completed"
            };

            await axios.put(
                `${API_URL}/${id}`,
                updatedInterview
            );

            alert("Interview insights saved successfully!");

            setInterview(updatedInterview);

        } catch (error) {

            console.log("Error saving insights:", error);

            alert("Unable to save interview insights.");

        } finally {

            setSaving(false);

        }
    };


    if (loading) {

        return (
            <div className="interview-insights-loading">
                Loading interview insights...
            </div>
        );
    }


    if (!interview) {

        return (
            <div className="interview-insights-loading">
                Interview not found.
            </div>
        );
    }


    return (

        <div className="interview-insights-page">

            {/* ================= HEADER ================= */}

            <div className="insights-top">

                <button
                    className="back-to-interviews"
                    onClick={() => navigate("/interviews")}
                >
                    <ArrowLeft size={15} />
                    Back to Interviews
                </button>


                <div className="insights-header-row">

                    <div>

                        <h1>Interview Insights</h1>

                        <p>
                            Capture what happened, identify your
                            strengths and weak areas, and prepare
                            better for your next interview.
                        </p>

                    </div>


                    <button
                        className="primary-btn"
                        onClick={saveInsights}
                        disabled={saving}
                    >

                        <Save size={15} />

                        {saving
                            ? "Saving..."
                            : "Save Insights"}

                    </button>

                </div>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="insights-summary-card">

                <div className="summary-company-icon">

                    {interview.company
                        ?.charAt(0)
                        .toUpperCase()}

                </div>


                <div className="summary-interview-info">

                    <h2>
                        {interview.role}
                    </h2>

                    <p>
                        {interview.company}
                        {" • "}
                        {interview.interviewRound}
                        {" • "}
                        {interview.interviewDate}
                    </p>

                </div>


                <div className="summary-tags">

                    <span>
                        {interview.interviewType}
                    </span>

                    <span className="completed-tag">
                        <CheckCircle2 size={12} />
                        Completed
                    </span>

                </div>

            </div>


            {/* ================= MAIN GRID ================= */}

            <div className="insights-content-grid">


                {/* LEFT */}

                <div className="insights-main-column">


                    {/* QUESTIONS */}

                    <section className="insight-card">

                        <div className="insight-card-header">

                            <div>

                                <h2>Questions Asked</h2>

                                <p>
                                    Record the questions you were
                                    asked during the interview.
                                </p>

                            </div>

                            <span className="question-count">
                                {questions.length}
                            </span>

                        </div>


                        <div className="question-list">

                            {questions.length === 0 ? (

                                <div className="empty-question">
                                    No questions added yet.
                                </div>

                            ) : (

                                questions.map(
                                    (question, index) => (

                                        <div
                                            className="question-item"
                                            key={index}
                                        >

                                            <div className="question-content">

                                                <div className="question-tags">

                                                    <span>
                                                        {question.category}
                                                    </span>

                                                    <span>
                                                        {question.difficulty}
                                                    </span>

                                                </div>

                                                <p>
                                                    {question.text}
                                                </p>

                                            </div>


                                            <button
                                                className="question-delete"
                                                onClick={() =>
                                                    deleteQuestion(index)
                                                }
                                            >

                                                <Trash2 size={15} />

                                            </button>

                                        </div>

                                    )
                                )
                            )}

                        </div>


                        {/* ADD QUESTION */}

                        <div className="add-question-box">

                            <input
                                value={newQuestion}
                                onChange={(e) =>
                                    setNewQuestion(e.target.value)
                                }
                                placeholder="Enter interview question..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        addQuestion();
                                    }
                                }}
                            />


                            <select
                                value={newCategory}
                                onChange={(e) =>
                                    setNewCategory(e.target.value)
                                }
                            >
                                <option>General</option>
                                <option>Java</option>
                                <option>Spring Boot</option>
                                <option>SQL</option>
                                <option>System Design</option>
                                <option>HR</option>
                            </select>


                            <select
                                value={newDifficulty}
                                onChange={(e) =>
                                    setNewDifficulty(e.target.value)
                                }
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>


                            <button
                                className="add-question-btn"
                                onClick={addQuestion}
                            >

                                <Plus size={15} />

                                Add

                            </button>

                        </div>

                    </section>


                    {/* EXPERIENCE */}

                    <section className="insight-card">

                        <div className="insight-card-header">

                            <div>

                                <h2>How Did It Go?</h2>

                                <p>
                                    Describe your interview experience.
                                </p>

                            </div>

                        </div>


                        <textarea
                            className="insight-large-textarea"
                            value={experience}
                            onChange={(e) =>
                                setExperience(e.target.value)
                            }
                            placeholder="How did the interview feel? What topics did the interviewer focus on? Were there any unexpected questions?"
                        />

                    </section>


                    {/* TAKEAWAYS */}

                    <section className="insight-card">

                        <div className="insight-card-header">

                            <div>

                                <h2>Key Takeaways</h2>

                                <p>
                                    What did you learn from this interview?
                                </p>

                            </div>

                        </div>


                        <div className="tag-list">

                            {takeaways.map(
                                (item, index) => (

                                    <span
                                        className="insight-tag takeaway-tag"
                                        key={index}
                                    >

                                        {item}

                                        <button
                                            onClick={() =>
                                                removeTakeaway(index)
                                            }
                                        >
                                            ×
                                        </button>

                                    </span>
                                )
                            )}

                        </div>


                        <div className="tag-input-row">

                            <input
                                value={newTakeaway}
                                onChange={(e) =>
                                    setNewTakeaway(e.target.value)
                                }
                                placeholder="Add a takeaway..."
                            />

                            <button
                                onClick={addTakeaway}
                                className="secondary-btn"
                            >
                                <Plus size={14} />
                                Add
                            </button>

                        </div>

                    </section>

                </div>


                {/* RIGHT */}

                <div className="insights-side-column">


                    {/* EXPERIENCE FEEDBACK */}

                    <section className="insight-card">

                        <h2>Feedback & Result</h2>


                        <label className="insight-label">
                            Personal Rating
                        </label>


                        <div className="star-rating">

                            {[1, 2, 3, 4, 5].map(
                                (star) => (

                                    <button
                                        key={star}
                                        className={
                                            star <= rating
                                                ? "star active"
                                                : "star"
                                        }
                                        onClick={() =>
                                            setRating(star)
                                        }
                                    >

                                        <Star
                                            size={21}
                                            fill={
                                                star <= rating
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />

                                    </button>

                                )
                            )}

                        </div>


                        <label className="insight-label">
                            Interviewer Feedback
                        </label>


                        <textarea
                            className="feedback-textarea"
                            value={feedback}
                            onChange={(e) =>
                                setFeedback(e.target.value)
                            }
                            placeholder="Add feedback received from the interviewer..."
                        />


                        <label className="insight-label">
                            Final Outcome
                        </label>


                        <select
                            className="insight-select"
                            value={result}
                            onChange={(e) =>
                                setResult(e.target.value)
                            }
                        >

                            <option>
                                Waiting for Response
                            </option>

                            <option>
                                Selected
                            </option>

                            <option>
                                Rejected
                            </option>

                            <option>
                                Offer
                            </option>

                        </select>

                    </section>


                    {/* STRENGTHS */}

                    <section className="insight-card">

                        <h2>What Went Well</h2>

                        <div className="tag-list">

                            {strengths.map(
                                (item, index) => (

                                    <span
                                        className="insight-tag strength-tag"
                                        key={index}
                                    >

                                        {item}

                                        <button
                                            onClick={() =>
                                                removeStrength(index)
                                            }
                                        >
                                            ×
                                        </button>

                                    </span>
                                )
                            )}

                        </div>


                        <div className="tag-input-row">

                            <input
                                value={newStrength}
                                onChange={(e) =>
                                    setNewStrength(e.target.value)
                                }
                                placeholder="Add strength..."
                            />

                            <button
                                onClick={addStrength}
                                className="secondary-btn"
                            >
                                <Plus size={14} />
                            </button>

                        </div>

                    </section>


                    {/* WEAK AREAS */}

                    <section className="insight-card">

                        <h2>Areas to Improve</h2>

                        <div className="tag-list">

                            {areasToImprove.map(
                                (item, index) => (

                                    <span
                                        className="insight-tag weak-tag"
                                        key={index}
                                    >

                                        {item}

                                        <button
                                            onClick={() =>
                                                removeWeakArea(index)
                                            }
                                        >
                                            ×
                                        </button>

                                    </span>
                                )
                            )}

                        </div>


                        <div className="tag-input-row">

                            <input
                                value={newWeakArea}
                                onChange={(e) =>
                                    setNewWeakArea(e.target.value)
                                }
                                placeholder="Add area to improve..."
                            />

                            <button
                                onClick={addWeakArea}
                                className="secondary-btn"
                            >
                                <Plus size={14} />
                            </button>

                        </div>

                    </section>


                    {/* AI CARD */}

                    <section className="ai-insight-card">

                        <div className="ai-icon">

                            <Sparkles size={19} />

                        </div>

                        <h2>
                            Prepare for Your Next Interview
                        </h2>

                        <p>
                            CareerPilot can use these insights,
                            your resume and your next interview
                            details to create personalized preparation.
                        </p>


                        <button
                            className="ai-prepare-btn"
onClick={async () => {

    try {

        const response = await axios.get(
            "http://localhost:8051/interviews"
        );

        const upcoming = response.data
            .filter(
                (item) =>
                    item.status === "Upcoming"
            )
            .sort(
                (a, b) =>
                    new Date(a.interviewDate) -
                    new Date(b.interviewDate)
            );

        if (upcoming.length === 0) {

            alert(
                "No upcoming interview found. Add an upcoming interview to start AI preparation."
            );

            return;
        }

        navigate(
            `/ai-interview-coach/${upcoming[0].id}`
        );

    } catch (error) {

        console.error(
            "Error finding next interview:",
            error
        );

        alert(
            "Unable to find the next interview."
        );
    }
}}
                        >

                            <Sparkles size={15} />

                            Prepare for Next Interview

                        </button>

                    </section>

                </div>

            </div>

        </div>
    );
}

export default InterviewInsights;