import {
    Plus,
    Bell,
    Briefcase,
    CalendarDays,
    Trophy,
    XCircle,
    X
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/JobService";
import axios from "axios";


function Dashboard() {

    const [jobs, setJobs] = useState([]);

    const [interviewAlerts, setInterviewAlerts] =
        useState([]);

    const [showNotifications, setShowNotifications] =
        useState(false);

    const [showReminder, setShowReminder] =
        useState(false);


    // =========================================
    // LOAD DATA
    // =========================================

    useEffect(() => {

        loadJobs();
        loadInterviewNotifications();

    }, []);


    // =========================================
    // LOAD APPLICATIONS
    // =========================================

    const loadJobs = async () => {

        try {

            const response =
                await getAllJobs();

            setJobs(response.data || []);

        } catch (error) {

            console.log(
                "Error loading jobs:",
                error
            );

        }

    };


    // =========================================
    // LOAD INTERVIEW NOTIFICATIONS
    // =========================================

    const loadInterviewNotifications = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8051/interviews"
                );

            const allInterviews =
                response.data || [];


            const today = new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );


            const upcoming =
                allInterviews
                    .filter(
                        (item) =>
                            item.status === "Upcoming"
                    )
                    .filter((item) => {

                        const interviewDate =
                            new Date(
                                item.interviewDate
                            );

                        interviewDate.setHours(
                            0,
                            0,
                            0,
                            0
                        );


                        const difference =
                            interviewDate -
                            today;


                        const days =
                            Math.ceil(
                                difference /
                                (1000 * 60 * 60 * 24)
                            );


                        return (
                            days >= 0 &&
                            days <= 2
                        );

                    })
                    .sort(
                        (a, b) =>
                            new Date(
                                a.interviewDate
                            ) -
                            new Date(
                                b.interviewDate
                            )
                    );


            setInterviewAlerts(upcoming);


            // Show popup when an interview
            // is within 2 days.

            if (upcoming.length > 0) {

                setShowReminder(true);

            }

        } catch (error) {

            console.log(
                "Error loading interviews:",
                error
            );

        }

    };


    // =========================================
    // STATISTICS
    // =========================================

    const totalApplications =
        jobs.length;


    const interviewCount =
        jobs.filter(
            (job) =>
                job.status === "Interview"
        ).length;


    const offers =
        jobs.filter(
            (job) =>
                job.status === "Offer"
        ).length;


    const rejected =
        jobs.filter(
            (job) =>
                job.status === "Rejected"
        ).length;


    // =========================================
    // RECENT APPLICATIONS
    // =========================================

    const recentJobs =
        [...jobs]
            .sort(
                (a, b) =>
                    new Date(
                        b.appliedDate
                    ) -
                    new Date(
                        a.appliedDate
                    )
            )
            .slice(0, 3);


    return (

        <div className="dashboard">


            {/* =================================
                TOP BAR
            ================================= */}

            <div className="top-bar">

                <div>

                    <h1>
                        Good morning, Poojasri 👋
                    </h1>

                    <p>
                        Here's what's happening
                        with your job search.
                    </p>

                </div>


                {/* NOTIFICATION */}

                <div className="top-actions">

                    <div className="notification-wrapper">

                        <button
                            className="notification-btn"
                            onClick={() =>
                                setShowNotifications(
                                    !showNotifications
                                )
                            }
                        >

                            <Bell size={20} />

                            {interviewAlerts.length >
                                0 && (

                                <span className="notification-badge">

                                    {interviewAlerts.length}

                                </span>

                            )}

                        </button>


                        {/* NOTIFICATION DROPDOWN */}

                        {showNotifications && (

                            <div className="notification-dropdown">

                                <div className="notification-header">

                                    <div>

                                        <strong>
                                            Notifications
                                        </strong>

                                        <span>
                                            Interview reminders
                                        </span>

                                    </div>


                                    <button
                                        onClick={() =>
                                            setShowNotifications(
                                                false
                                            )
                                        }
                                    >

                                        <X size={16} />

                                    </button>

                                </div>


                                {interviewAlerts.length ===
                                    0 ? (

                                    <div className="no-notifications">

                                        <Bell size={20} />

                                        <p>
                                            No upcoming
                                            interview reminders
                                        </p>

                                    </div>

                                ) : (

                                    interviewAlerts.map(
                                        (item) => {

                                            const today =
                                                new Date();

                                            today.setHours(
                                                0,
                                                0,
                                                0,
                                                0
                                            );


                                            const date =
                                                new Date(
                                                    item.interviewDate
                                                );

                                            date.setHours(
                                                0,
                                                0,
                                                0,
                                                0
                                            );


                                            const days =
                                                Math.ceil(
                                                    (
                                                        date -
                                                        today
                                                    ) /
                                                    (
                                                        1000 *
                                                        60 *
                                                        60 *
                                                        24
                                                    )
                                                );


                                            return (

                                                <div
                                                    className="notification-item"
                                                    key={item.id}
                                                >

                                                    <div className="notification-content">

                                                        <strong>

                                                            {days === 0
                                                                ? "Interview today"
                                                                : days === 1
                                                                    ? "Interview tomorrow"
                                                                    : `Interview in ${days} days`
                                                            }

                                                        </strong>


                                                        <p>

                                                            {item.company}
                                                            {" • "}
                                                            {item.role}

                                                        </p>


                                                        <span>

                                                            {item.interviewDate}
                                                            {" • "}
                                                            {item.interviewTime}

                                                        </span>

                                                    </div>

                                                </div>

                                            );

                                        }
                                    )

                                )}

                            </div>

                        )}

                    </div>


                    {/* PROFILE */}

                    <div className="profile">
                        PS
                    </div>

                </div>

            </div>


            {/* =================================
                ADD APPLICATION
            ================================= */}

            <div className="dashboard-actions">

                <Link
                    to="/add"
                    className="primary-btn"
                >

                    <Plus size={18} />

                    Add Application

                </Link>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="stats-grid">


                <div className="stat-card">

                    <div className="stat-icon purple">

                        <Briefcase size={20} />

                    </div>

                    <p>
                        Total Applications
                    </p>

                    <h2>
                        {totalApplications}
                    </h2>

                    <span className="positive">
                        Applications tracked
                    </span>

                </div>


                <div className="stat-card">

                    <div className="stat-icon blue">

                        <CalendarDays size={20} />

                    </div>

                    <p>
                        Interviews
                    </p>

                    <h2>
                        {interviewCount}
                    </h2>

                    <span className="positive">
                        Interview stage
                    </span>

                </div>


                <div className="stat-card">

                    <div className="stat-icon green">

                        <Trophy size={20} />

                    </div>

                    <p>
                        Offers
                    </p>

                    <h2>
                        {offers}
                    </h2>

                    <span className="positive">
                        Offers received
                    </span>

                </div>


                <div className="stat-card">

                    <div className="stat-icon red">

                        <XCircle size={20} />

                    </div>

                    <p>
                        Rejected
                    </p>

                    <h2>
                        {rejected}
                    </h2>

                    <span>
                        Applications rejected
                    </span>

                </div>

            </div>


            {/* =================================
                RECENT APPLICATIONS ONLY
            ================================= */}

            <div className="dashboard-single">

                <div className="card recent-card">

                    <div className="card-header">

                        <div>

                            <h2>
                                Recent Applications
                            </h2>

                            <p>
                                Your latest job applications
                            </p>

                        </div>


                        <Link to="/view">
                            View all
                        </Link>

                    </div>


                    {/* HEADER */}

                    <div className="application-row header-row">

                        <span>
                            Company
                        </span>

                        <span>
                            Role
                        </span>

                        <span>
                            Date
                        </span>

                        <span>
                            Status
                        </span>

                    </div>


                    {/* APPLICATIONS */}

                    {recentJobs.map(
                        (job) => (

                            <div
                                className="application-row"
                                key={job.id}
                            >

                                <span>
                                    <strong>
                                        {job.company}
                                    </strong>
                                </span>

                                <span>
                                    {job.role}
                                </span>

                                <span>
                                    {job.appliedDate}
                                </span>

                                <span>

                                    <span
                                        className={`status ${job.status.toLowerCase()}`}
                                    >

                                        {job.status}

                                    </span>

                                </span>

                            </div>

                        )
                    )}


                    {/* EMPTY */}

                    {recentJobs.length === 0 && (

                        <div className="empty-state">

                            No applications yet.

                            <br />

                            <Link to="/add">
                                Add your first application
                            </Link>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================
                INTERVIEW POPUP
            ================================= */}

            {showReminder &&
                interviewAlerts.length > 0 && (

                <div className="interview-reminder-overlay">

                    <div className="interview-reminder">

                        <button
                            className="reminder-close"
                            onClick={() =>
                                setShowReminder(false)
                            }
                        >

                            <X size={17} />

                        </button>


                        <div className="reminder-icon">

                            <Bell size={21} />

                        </div>


                        <h2>
                            Upcoming Interview
                        </h2>


                        <p className="reminder-subtitle">

                            You have an interview coming up.

                        </p>


                        <div className="reminder-details">

                            <strong>
                                {
                                    interviewAlerts[0]
                                        .company
                                }
                            </strong>

                            <span>
                                {
                                    interviewAlerts[0]
                                        .role
                                }
                            </span>


                            <div className="reminder-info">

                                <span>

                                    📅{" "}
                                    {
                                        interviewAlerts[0]
                                            .interviewDate
                                    }

                                </span>

                                <span>

                                    🕐{" "}
                                    {
                                        interviewAlerts[0]
                                            .interviewTime
                                    }

                                </span>

                            </div>

                        </div>


                        <button
                            className="reminder-later-btn"
                            onClick={() =>
                                setShowReminder(false)
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}


export default Dashboard;