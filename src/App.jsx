import { BrowserRouter, Routes, Route } from "react-router-dom";

import Resume from "./pages/Resume";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ViewJobs from "./pages/ViewJobs";
import EditJob from "./pages/EditJob";
import Layout from "./components/Layout";
import CoverLetter from "./pages/CoverLetter";
import Interviews from "./pages/Interviews";
import InterviewInsights from "./pages/InterviewInsights";
import AIInterviewCoach from "./pages/AIInterviewCoach";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* LANDING PAGE - WITHOUT SIDEBAR */}
                <Route
                    path="/landing"
                    element={<LandingPage />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />

                {/* ADD APPLICATION */}
                <Route
                    path="/add"
                    element={
                        <Layout>
                            <AddJob />
                        </Layout>
                    }
                />

                {/* VIEW APPLICATIONS */}
                <Route
                    path="/view"
                    element={
                        <Layout>
                            <ViewJobs />
                        </Layout>
                    }
                />

                {/* EDIT APPLICATION */}
                <Route
                    path="/edit/:id"
                    element={
                        <Layout>
                            <EditJob />
                        </Layout>
                    }
                />

                {/* RESUME */}
                <Route
                    path="/resume"
                    element={
                        <Layout>
                            <Resume />
                        </Layout>
                    }
                />

                {/* INTERVIEWS */}
                <Route
                    path="/interviews"
                    element={
                        <Layout>
                            <Interviews />
                        </Layout>
                    }
                />

                {/* INTERVIEW INSIGHTS */}
                <Route
                    path="/interview-insights/:id"
                    element={
                        <Layout>
                            <InterviewInsights />
                        </Layout>
                    }
                />

                {/* AI INTERVIEW COACH */}
                <Route
                    path="/ai-interview-coach/:id"
                    element={
                        <Layout>
                            <AIInterviewCoach />
                        </Layout>
                    }
                />

                {/* AI COVER LETTER */}
                <Route
                    path="/cover-letter"
                    element={
                        <Layout>
                            <CoverLetter />
                        </Layout>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;