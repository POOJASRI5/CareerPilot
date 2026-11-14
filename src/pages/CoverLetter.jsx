import { useEffect, useState } from "react";
import { Copy, Download, Sparkles } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";
import { getAllResumes } from "../services/ResumeService";

function CoverLetter() {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [resumeId, setResumeId] = useState("");
    const [resumes, setResumes] = useState([]);
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);


    // ============================
    // LOAD RESUMES
    // ============================

    useEffect(() => {
        loadResumes();
    }, []);


    const loadResumes = async () => {

        try {

            const response = await getAllResumes();

            setResumes(response.data);

        } catch (error) {

            console.log(
                "Error loading resumes:",
                error
            );

        }
    };


    // ============================
    // GENERATE COVER LETTER
    // ============================

    const generateCoverLetter = async (e) => {

        e.preventDefault();

        if (!resumeId) {

            alert("Please select a resume");

            return;
        }

        setLoading(true);

        setCoverLetter("");

        try {

            // Get selected resume text

            const resumeResponse = await axios.get(
                `http://localhost:8051/resumes/${resumeId}/text`
            );

            const resumeText =
                resumeResponse.data;


            // Send resume + company + role
            // to Spring Boot / Groq

            const response = await axios.post(
                "http://localhost:8051/cover-letter",
                null,
                {
                    params: {
                        company: company,
                        role: role,
                        resumeText: resumeText
                    }
                }
            );


            setCoverLetter(response.data);


        } catch (error) {

            console.log(
                "Error generating cover letter:",
                error
            );

            alert(
                "Error generating cover letter"
            );

        } finally {

            setLoading(false);

        }
    };


    // ============================
    // COPY
    // ============================

    const copyCoverLetter = async () => {

        try {

            await navigator.clipboard.writeText(
                coverLetter
            );

            alert(
                "Cover letter copied!"
            );

        } catch (error) {

            console.log(
                "Copy failed:",
                error
            );

            alert(
                "Unable to copy cover letter"
            );
        }
    };


    // ============================
    // SAVE AS PDF
    // ============================

    const saveAsPDF = () => {

        if (!coverLetter) {

            alert(
                "Please generate a cover letter first."
            );

            return;
        }


        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const marginLeft = 20;
        const marginRight = 20;
        const marginTop = 20;
        const marginBottom = 20;

        const contentWidth =
            pageWidth -
            marginLeft -
            marginRight;

        let y = marginTop;


        // ============================
        // PDF TITLE
        // ============================

        doc.setFont(
            "times",
            "bold"
        );

        doc.setFontSize(16);

        doc.text(
            "Cover Letter",
            marginLeft,
            y
        );

        y += 12;


        // ============================
        // COMPANY / ROLE
        // ============================

        doc.setFont(
            "times",
            "normal"
        );

        doc.setFontSize(11);

        doc.text(
            `${company} - ${role}`,
            marginLeft,
            y
        );

        y += 12;


        // ============================
        // COVER LETTER CONTENT
        // ============================

        const paragraphs =
            coverLetter.split("\n");


        paragraphs.forEach((paragraph) => {

            // Empty line

            if (!paragraph.trim()) {

                y += 6;

                return;
            }


            const wrappedLines =
                doc.splitTextToSize(
                    paragraph,
                    contentWidth
                );


            wrappedLines.forEach((line) => {

                // New page if needed

                if (
                    y >
                    pageHeight -
                    marginBottom
                ) {

                    doc.addPage();

                    y = marginTop;

                }


                doc.text(
                    line,
                    marginLeft,
                    y
                );

                y += 6;

            });


            y += 3;

        });


        // ============================
        // SAFE FILE NAME
        // ============================

        const safeCompany =
            company
                .replace(
                    /[^a-z0-9]/gi,
                    "_"
                );

        const safeRole =
            role
                .replace(
                    /[^a-z0-9]/gi,
                    "_"
                );


        const fileName =
            `${safeCompany}_${safeRole}_Cover_Letter.pdf`;


        // ============================
        // DOWNLOAD
        // ============================

        doc.save(fileName);
    };


    return (

        <div className="cover-letter-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        AI Cover Letter Generator
                    </h1>

                    <p>
                        Generate a personalized
                        cover letter using your resume.
                    </p>

                </div>

            </div>


            <div className="cover-letter-card">


                {/* ============================
                    FORM
                ============================ */}

                <form
                    onSubmit={generateCoverLetter}
                >

                    <div className="job-form-grid">


                        {/* COMPANY */}

                        <div className="form-group">

                            <label>
                                COMPANY NAME
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Google"
                                value={company}
                                onChange={(e) =>
                                    setCompany(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* ROLE */}

                        <div className="form-group">

                            <label>
                                JOB ROLE
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Java Developer"
                                value={role}
                                onChange={(e) =>
                                    setRole(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* RESUME */}

                        <div className="form-group full">

                            <label>
                                SELECT RESUME
                            </label>

                            <select
                                value={resumeId}
                                onChange={(e) =>
                                    setResumeId(
                                        e.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select a resume
                                </option>


                                {resumes.map(
                                    (resume) => (

                                        <option
                                            key={
                                                resume.id
                                            }
                                            value={
                                                resume.id
                                            }
                                        >

                                            {resume.resumeName}
                                            {" - "}
                                            {resume.version}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    {/* ============================
                        GENERATE BUTTON
                    ============================ */}

                    <div className="cover-letter-action">

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >

                            <Sparkles
                                size={17}
                            />

                            {loading
                                ? "Generating..."
                                : "Generate Cover Letter"}

                        </button>

                    </div>

                </form>


                {/* ============================
                    GENERATED LETTER
                ============================ */}

                {coverLetter && (

                    <div className="generated-letter">


                        {/* HEADER */}

                        <div className="generated-header">

                            <div>

                                <h2>
                                    Generated Cover Letter
                                </h2>

                                <p>
                                    Review and customize it
                                    before sending.
                                </p>

                            </div>


                            {/* ACTION BUTTONS */}

                            <div
                                className="letter-actions"
                            >

                                <button
                                    type="button"
                                    className="secondary-btn"
                                    onClick={
                                        copyCoverLetter
                                    }
                                >

                                    <Copy
                                        size={16}
                                    />

                                    Copy

                                </button>


                                <button
                                    type="button"
                                    className="secondary-btn"
                                    onClick={
                                        saveAsPDF
                                    }
                                >

                                    <Download
                                        size={16}
                                    />

                                    Save as PDF

                                </button>

                            </div>

                        </div>


                        {/* ============================
                            LETTER CONTENT
                        ============================ */}

                        <div className="letter-content">

                            {coverLetter
                                .split("\n")
                                .map(
                                    (
                                        line,
                                        index
                                    ) => (

                                        <p
                                            key={
                                                index
                                            }
                                        >

                                            {line ||
                                                "\u00A0"}

                                        </p>

                                    )
                                )}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}


export default CoverLetter;