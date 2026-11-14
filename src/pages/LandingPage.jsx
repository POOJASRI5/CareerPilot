import { Link } from "react-router-dom";
import {
    BriefcaseBusiness,
    Bot,
    ClipboardCheck,
    BarChart3,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

import "./LandingPage.css";

function LandingPage() {

    return (
        <div className="landing-page">

            {/* NAVBAR */}
            <header className="landing-nav">

                <div className="landing-logo">
                    <div className="logo-mark">
                        <BriefcaseBusiness size={20} />
                    </div>

                    <span>CareerPilot</span>
                </div>

                <nav>
                    <a href="#features">Features</a>
                    <a href="#pathway">How It Works</a>
                    <a href="#about">About</a>
                </nav>

                <Link
                    to="/"
                    className="landing-login"
                >
                    Enter CareerPilot
                </Link>

            </header>


            {/* HERO */}
            <section className="landing-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        ✦ Your all-in-one career companion
                    </div>

                    <h1>
                        Your Job Search
                        <span> Command Center</span>
                    </h1>

                    <p>
                        Track applications, prepare for interviews,
                        manage your resumes and stay organized throughout
                        your job search — all in one place.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/"
                            className="hero-primary"
                        >
                            Get Started
                            <ArrowRight size={18} />
                        </Link>

                        <a
                            href="#features"
                            className="hero-secondary"
                        >
                            Explore Features
                        </a>

                    </div>


                    <div className="hero-points">

                        <span>
                            <CheckCircle2 size={16} />
                            Application Tracking
                        </span>

                        <span>
                            <CheckCircle2 size={16} />
                            AI Interview Coach
                        </span>

                        <span>
                            <CheckCircle2 size={16} />
                            Interview Insights
                        </span>

                    </div>

                </div>


                {/* HERO VISUAL */}

                <div className="hero-visual">

                    <div className="dashboard-preview">

                        <div className="preview-top">

                            <div className="preview-brand">
                                <div className="preview-logo">
                                    <BriefcaseBusiness size={15} />
                                </div>

                                <strong>
                                    CareerPilot
                                </strong>
                            </div>

                            <div className="preview-dots">
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>

                        </div>


                        <div className="preview-heading">
                            <span>
                                Good morning 👋
                            </span>

                            <strong>
                                Your career at a glance
                            </strong>
                        </div>


                        <div className="preview-stats">

                            <div>
                                <small>
                                    Applications
                                </small>

                                <strong>
                                    24
                                </strong>
                            </div>

                            <div>
                                <small>
                                    Interviews
                                </small>

                                <strong>
                                    6
                                </strong>
                            </div>

                            <div>
                                <small>
                                    Offers
                                </small>

                                <strong>
                                    2
                                </strong>
                            </div>

                        </div>


                        <div className="preview-card">

                            <div className="preview-card-title">
                                <span>
                                    Recent Applications
                                </span>

                                <small>
                                    View all
                                </small>
                            </div>

                            <div className="preview-job">
                                <div className="job-icon">
                                    G
                                </div>

                                <div>
                                    <strong>
                                        Software Engineer
                                    </strong>

                                    <small>
                                        Google
                                    </small>
                                </div>

                                <span>
                                    Interview
                                </span>
                            </div>

                            <div className="preview-job">
                                <div className="job-icon">
                                    M
                                </div>

                                <div>
                                    <strong>
                                        DevOps Engineer
                                    </strong>

                                    <small>
                                        Microsoft
                                    </small>
                                </div>

                                <span>
                                    Applied
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section
                className="features-section"
                id="features"
            >

                <div className="section-heading">

                    <span>
                        EVERYTHING YOU NEED
                    </span>

                    <h2>
                        Built for your
                        <em> next opportunity</em>
                    </h2>

                    <p>
                        CareerPilot brings your entire job search
                        workflow together so you can focus on getting
                        the right role.
                    </p>

                </div>


                <div className="feature-grid">

                    <div className="feature-card">

                        <div className="feature-icon blue">
                            <ClipboardCheck size={22} />
                        </div>

                        <h3>
                            Track Every Application
                        </h3>

                        <p>
                            Keep all your applications, companies,
                            roles, dates and statuses organized in
                            one simple workspace.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon purple">
                            <Bot size={22} />
                        </div>

                        <h3>
                            AI Interview Coach
                        </h3>

                        <p>
                            Practice mock interviews, prepare for
                            specific roles and strengthen your weak
                            areas with personalized AI guidance.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon pink">
                            <BriefcaseBusiness size={22} />
                        </div>

                        <h3>
                            Interview Memory
                        </h3>

                        <p>
                            Record questions, strengths, areas to
                            improve and key takeaways from every
                            interview.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon green">
                            <BarChart3 size={22} />
                        </div>

                        <h3>
                            Career Insights
                        </h3>

                        <p>
                            Understand your interview patterns and
                            preparation progress so you know where
                            to improve next.
                        </p>

                    </div>

                </div>

            </section>


            {/* PATHWAY */}

            <section
                className="pathway-section"
                id="pathway"
            >

                <div className="section-heading">

                    <span>
                        YOUR CAREER JOURNEY
                    </span>

                    <h2>
                        The Pathway to your
                        <em> Next Role</em>
                    </h2>

                    <p>
                        One place to manage every step of your
                        job search.
                    </p>

                </div>


                <div className="pathway">

                    <div className="path-step">

                        <div className="path-number">
                            01
                        </div>

                        <h3>
                            Apply
                        </h3>

                        <p>
                            Save and organize every opportunity.
                        </p>

                    </div>


                    <div className="path-line"></div>


                    <div className="path-step">

                        <div className="path-number">
                            02
                        </div>

                        <h3>
                            Track
                        </h3>

                        <p>
                            Stay on top of application progress.
                        </p>

                    </div>


                    <div className="path-line"></div>


                    <div className="path-step">

                        <div className="path-number">
                            03
                        </div>

                        <h3>
                            Prepare
                        </h3>

                        <p>
                            Practice and prepare for interviews.
                        </p>

                    </div>


                    <div className="path-line"></div>


                    <div className="path-step active">

                        <div className="path-number">
                            04
                        </div>

                        <h3>
                            Land the Offer
                        </h3>

                        <p>
                            Turn preparation into your next role.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section
                className="landing-cta"
                id="about"
            >

                <div>

                    <h2>
                        Ready to take control of your job search?
                    </h2>

                    <p>
                        Start organizing your applications and
                        preparing smarter with CareerPilot.
                    </p>

                </div>


                <Link
                    to="/"
                    className="hero-primary"
                >
                    Enter CareerPilot
                    <ArrowRight size={18} />
                </Link>

            </section>


            {/* FOOTER */}

            <footer className="landing-footer">

                <div className="landing-logo">

                    <div className="logo-mark">
                        <BriefcaseBusiness size={17} />
                    </div>

                    <span>
                        CareerPilot
                    </span>

                </div>

                <p>
                    Your personal job search command center.
                </p>

                <small>
                    © 2026 CareerPilot. All rights reserved.
                </small>

            </footer>

        </div>
    );
}

export default LandingPage;