import { useEffect, useState } from "react";
import {
    Plus,
    Bell,
    CalendarDays,
    Clock,
    Video,
    Pencil,
    Trash2,
    X,
    Sparkles,
    CheckCircle2
} from "lucide-react";

import {
    getAllInterviews,
    addInterview,
    updateInterview,
    deleteInterview
} from "../services/InterviewService";

import { getAllResumes } from "../services/ResumeService";
import { useNavigate } from "react-router-dom";

function Interviews() {

    const [interviews, setInterviews] = useState([]);
    const [resumes, setResumes] = useState([]);
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [reminder, setReminder] = useState(null);

    const [interview, setInterview] = useState({
        company: "",
        role: "",
        interviewDate: "",
        interviewTime: "",
        interviewRound: "",
        interviewType: "Online",
        meetingLink: "",
        resumeId: "",
        notes: "",
        status: "Upcoming",
        result: ""
    });

    useEffect(() => {
        loadInterviews();
        loadResumes();
    }, []);

    useEffect(() => {
        if (interviews.length > 0) {
            checkInterviewReminders();
        }

        const interval = setInterval(() => {
            checkInterviewReminders();
        }, 60000);

        return () => clearInterval(interval);
    }, [interviews]);


    // =========================
    // LOAD DATA
    // =========================

    const loadInterviews = async () => {
        try {
            const response = await getAllInterviews();
            setInterviews(response.data);
        } catch (error) {
            console.log("Error loading interviews:", error);
        }
    };

    const loadResumes = async () => {
        try {
            const response = await getAllResumes();
            setResumes(response.data);
        } catch (error) {
            console.log("Error loading resumes:", error);
        }
    };


    // =========================
    // REMINDER POPUP
    // =========================

    const getDaysRemaining = (date, time) => {

        if (!date) return null;

        const now = new Date();

        const interviewDate = new Date(
            `${date}T${time || "09:00"}`
        );

        const difference =
            interviewDate.getTime() - now.getTime();

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    };


    const checkInterviewReminders = () => {

        const now = new Date();

        interviews.forEach((item) => {

            if (!item.interviewDate) return;

            const interviewDate = new Date(
                `${item.interviewDate}T${item.interviewTime || "09:00"}`
            );

            const difference =
                interviewDate.getTime() - now.getTime();

            const daysRemaining = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            );

            if (
                daysRemaining === 2 ||
                daysRemaining === 1 ||
                daysRemaining === 0
            ) {

                const reminderKey =
                    `interview-reminder-${item.id}-${item.interviewDate}-${daysRemaining}`;

                const alreadyShown =
                    sessionStorage.getItem(reminderKey);

                if (!alreadyShown) {

                    setReminder({
                        ...item,
                        daysRemaining
                    });

                    sessionStorage.setItem(
                        reminderKey,
                        "true"
                    );
                }
            }
        });
    };


    // =========================
    // FORM
    // =========================

    const handleChange = (e) => {

        setInterview({
            ...interview,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateInterview(
                    editingId,
                    interview
                );

                alert("Interview updated successfully!");

            } else {

                await addInterview(interview);

                alert("Interview added successfully!");
            }

            resetForm();
            loadInterviews();

        } catch (error) {

            console.log(error);
            alert("Error saving interview");
        }
    };


    const handleEdit = (item) => {

        setEditingId(item.id);

        setInterview({
            company: item.company || "",
            role: item.role || "",
            interviewDate: item.interviewDate || "",
            interviewTime: item.interviewTime || "",
            interviewRound: item.interviewRound || "",
            interviewType: item.interviewType || "Online",
            meetingLink: item.meetingLink || "",
            resumeId: item.resumeId || "",
            notes: item.notes || "",
            status: item.status || "Upcoming",
            result: item.result || ""
        });

        setShowForm(true);
    };


    const handleDelete = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this interview?"
        )) {
            return;
        }

        try {

            await deleteInterview(id);
            loadInterviews();

        } catch (error) {

            console.log(error);
            alert("Error deleting interview");
        }
    };


    const resetForm = () => {

        setInterview({
            company: "",
            role: "",
            interviewDate: "",
            interviewTime: "",
            interviewRound: "",
            interviewType: "Online",
            meetingLink: "",
            resumeId: "",
            notes: "",
            status: "Upcoming",
            result: ""
        });

        setEditingId(null);
        setShowForm(false);
    };


    // =========================
    // FILTER
    // =========================

    const upcomingInterviews = interviews.filter((item) => {

        const days = getDaysRemaining(
            item.interviewDate,
            item.interviewTime
        );

        return (
            days !== null &&
            days >= 0 &&
            item.status !== "Completed"
        );
    });


    const pastInterviews = interviews.filter((item) => {

        const days = getDaysRemaining(
            item.interviewDate,
            item.interviewTime
        );

        return (
            days < 0 ||
            item.status === "Completed"
        );
    });


    const thisWeekCount =
        upcomingInterviews.filter((item) => {

            const days = getDaysRemaining(
                item.interviewDate,
                item.interviewTime
            );

            return days >= 0 && days <= 7;

        }).length;


    const completedCount = pastInterviews.length;

    const offersCount =
        interviews.filter(
            (item) => item.result === "Offer"
        ).length;


    // =========================
    // PREPARE
    // =========================

    const prepareInterview = (id) => {

      setReminder(null);

      navigate(`/ai-interview-coach/${id}`);
   };


    return (

        <div className="interviews-page">

            {/* ================= HEADER ================= */}

            <div className="interviews-header">

                <div>

                    <h1>Interviews</h1>

                    <p>
                        Manage your interviews and prepare
                        with confidence.
                    </p>

                </div>

                <button
                    className="primary-btn interview-add-btn"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >

                    <Plus size={17} />

                    Add Interview

                </button>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="interview-stats">

                <div className="interview-stat-card">

                    <span>Upcoming Interviews</span>

                    <strong>
                        {upcomingInterviews.length}
                    </strong>

                </div>


                <div className="interview-stat-card">

                    <span>This Week</span>

                    <strong>
                        {thisWeekCount}
                    </strong>

                </div>


                <div className="interview-stat-card">

                    <span>Completed</span>

                    <strong>
                        {completedCount}
                    </strong>

                </div>


                <div className="interview-stat-card">

                    <span>Offers</span>

                    <strong className="offer-number">
                        {offersCount}
                    </strong>

                </div>

            </div>


            {/* ================= FORM ================= */}

            {showForm && (

                <div className="interview-form-card">

                    <div className="interview-form-header">

                        <div>

                            <h2>
                                {editingId
                                    ? "Edit Interview"
                                    : "Add Interview"}
                            </h2>

                            <p>
                                Add the details of your interview.
                            </p>

                        </div>

                        <button
                            className="close-form-btn"
                            onClick={resetForm}
                        >
                            <X size={19} />
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="interview-form-grid">

                            <div className="form-group">

                                <label>COMPANY NAME *</label>

                                <input
                                    name="company"
                                    value={interview.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Google"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>JOB ROLE *</label>

                                <input
                                    name="role"
                                    value={interview.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Developer"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>INTERVIEW DATE *</label>

                                <input
                                    type="date"
                                    name="interviewDate"
                                    value={interview.interviewDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>INTERVIEW TIME *</label>

                                <input
                                    type="time"
                                    name="interviewTime"
                                    value={interview.interviewTime}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>INTERVIEW ROUND *</label>

                                <select
                                    name="interviewRound"
                                    value={interview.interviewRound}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select round
                                    </option>

                                    <option>HR</option>
                                    <option>Technical</option>
                                    <option>Managerial</option>
                                    <option>Final</option>
                                    <option>Other</option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>INTERVIEW TYPE *</label>

                                <select
                                    name="interviewType"
                                    value={interview.interviewType}
                                    onChange={handleChange}
                                >

                                    <option>Online</option>
                                    <option>In-person</option>
                                    <option>Phone</option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>MEETING LINK</label>

                                <input
                                    name="meetingLink"
                                    value={interview.meetingLink}
                                    onChange={handleChange}
                                    placeholder="Optional"
                                />

                            </div>


                            <div className="form-group">

                                <label>SELECT RESUME</label>

                                <select
                                    name="resumeId"
                                    value={interview.resumeId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select resume
                                    </option>

                                    {resumes.map((resume) => (

                                        <option
                                            key={resume.id}
                                            value={resume.id}
                                        >
                                            {resume.resumeName} - {resume.version}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            <div className="form-group full">

                                <label>NOTES</label>

                                <textarea
                                    name="notes"
                                    value={interview.notes}
                                    onChange={handleChange}
                                    placeholder="Add notes..."
                                />

                            </div>

                        </div>


                        <div className="interview-form-actions">

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="primary-btn"
                            >
                                {editingId
                                    ? "Update Interview"
                                    : "Save Interview"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ================= UPCOMING ================= */}

            <div className="interview-section">

                <div className="section-heading">

                    <div>

                        <h2>Upcoming Interviews</h2>

                        <p>
                            Stay prepared for what's coming next.
                        </p>

                    </div>

                    <span className="section-count">
                        {upcomingInterviews.length}
                    </span>

                </div>


                {upcomingInterviews.length === 0 ? (

                    <div className="interview-empty">

                        <CalendarDays size={30} />

                        <h3>No upcoming interviews</h3>

                        <p>
                            Add an interview to start preparing.
                        </p>

                    </div>

                ) : (

                    <div className="interview-card-list">

                        {upcomingInterviews.map((item) => {

                            const days =
                                getDaysRemaining(
                                    item.interviewDate,
                                    item.interviewTime
                                );

                            return (

                                <div
                                    className="interview-modern-card"
                                    key={item.id}
                                >

                                    <div className="interview-card-main">

                                        <div className="company-icon">
                                            {item.company
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>


                                        <div className="interview-details">

                                            <div className="interview-company-row">

                                                <h3>
                                                    {item.company}
                                                </h3>

                                                {days <= 2 && (

                                                    <span className="urgent-badge">

                                                        <Bell size={12} />

                                                        {days === 0
                                                            ? "Today"
                                                            : days === 1
                                                                ? "Tomorrow"
                                                                : "In 2 days"}

                                                    </span>
                                                )}

                                            </div>


                                            <p className="interview-role">

                                                {item.role}

                                                <span>•</span>

                                                {item.interviewRound}

                                            </p>


                                            <div className="interview-meta">

                                                <span>
                                                    <CalendarDays size={14} />
                                                    {item.interviewDate}
                                                </span>

                                                <span>
                                                    <Clock size={14} />
                                                    {item.interviewTime}
                                                </span>

                                                <span>
                                                    <Video size={14} />
                                                    {item.interviewType}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="interview-card-right">

                                        <div className="countdown">

                                            {days === 0
                                                ? "Interview today"
                                                : days === 1
                                                    ? "Interview tomorrow"
                                                    : `Interview in ${days} days`}

                                        </div>


                                        <div className="interview-card-actions">

                                            <button
                                                className="primary-btn small-btn"
                                                onClick={() => prepareInterview(item.id)}
                                            >

                                                <Sparkles size={14} />

                                                Prepare

                                            </button>


                                            <button
                                                className="secondary-btn small-btn"
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                            >

                                                <Pencil size={14} />

                                                Edit

                                            </button>


                                            <button
                                                className="icon-btn delete-interview-btn"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >

                                                <Trash2 size={16} />

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>


            {/* ================= PAST ================= */}

            <div className="interview-section past-section">

                <div className="section-heading">

                    <div>

                        <h2>Past Interviews</h2>

                        <p>
                            Review your previous interview experiences.
                        </p>

                    </div>

                    <span className="section-count">
                        {pastInterviews.length}
                    </span>

                </div>


                {pastInterviews.length === 0 ? (

                    <div className="interview-empty">

                        <CheckCircle2 size={30} />

                        <h3>No past interviews</h3>

                        <p>
                            Completed interviews will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="interview-card-list">

                        {pastInterviews.map((item) => (

                            <div
                                className="interview-modern-card past-interview-card"
                                key={item.id}
                            >

                                <div className="interview-card-main">

                                    <div className="company-icon past-icon">

                                        {item.company
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div className="interview-details">

                                        <div className="interview-company-row">

                                            <h3>
                                                {item.company}
                                            </h3>

                                            <span className="completed-badge">

                                                <CheckCircle2 size={12} />

                                                {item.result || "Completed"}

                                            </span>

                                        </div>


                                        <p className="interview-role">

                                            {item.role}

                                            <span>•</span>

                                            {item.interviewRound}

                                        </p>


                                        <div className="interview-meta">

                                            <span>
                                                <CalendarDays size={14} />
                                                {item.interviewDate}
                                            </span>

                                            {item.interviewTime && (
                                                <span>
                                                    <Clock size={14} />
                                                    {item.interviewTime}
                                                </span>
                                            )}

                                            {item.interviewType && (
                                                <span>
                                                    <Video size={14} />
                                                    {item.interviewType}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>


                                <div className="interview-card-right">

                                    <button
                                       className="secondary-btn insights-btn"
                                       onClick={() =>
                                       navigate(`/interview-insights/${item.id}`)
                                       }
                                    >
                                       View Insights
                                    </button>


                                    <button
                                        className="icon-btn delete-interview-btn"
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ================= REMINDER POPUP ================= */}

            {reminder && (

                <div className="interview-reminder-overlay">

                    <div className="interview-reminder-popup">

                        <button
                            className="popup-close"
                            onClick={() => setReminder(null)}
                        >
                            <X size={18} />
                        </button>


                        <div className="popup-bell">

                            <Bell size={25} />

                        </div>


                        <span className="popup-label">
                            Interview Reminder
                        </span>


                        <h2>
                            {reminder.company}
                        </h2>


                        <p className="popup-role">
                            {reminder.role}
                        </p>


                        <div className="popup-message">

                            {reminder.daysRemaining === 0
                                ? "Your interview is today!"
                                : reminder.daysRemaining === 1
                                    ? "Your interview is tomorrow."
                                    : "Your interview is in 2 days."}

                        </div>


                        <div className="popup-info">

                            <span>
                                <CalendarDays size={15} />
                                {reminder.interviewDate}
                            </span>

                            <span>
                                <Clock size={15} />
                                {reminder.interviewTime}
                            </span>

                            <span>
                                <Video size={15} />
                                {reminder.interviewType}
                            </span>

                        </div>


                        <div className="popup-actions">

                            <button
                                className="secondary-btn"
                                onClick={() =>
                                    setReminder(null)
                                }
                            >
                                Dismiss
                            </button>


                            <button
                                className="primary-btn"
                                onClick={() => prepareInterview(reminder.id)}
                            >

                                <Sparkles size={15} />

                                Prepare Now

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Interviews;