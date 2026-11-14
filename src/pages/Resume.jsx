import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
    getAllResumes,
    addResume,
    updateResume,
    deleteResume
} from "../services/ResumeService";

function Resume() {

    const [resumes, setResumes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [resume, setResume] = useState({
        resumeName: "",
        version: "",
        uploadedDate: ""
    });

    const [file, setFile] = useState(null);


    const loadResumes = async () => {

        try {

            const response = await getAllResumes();
            setResumes(response.data);

        } catch (error) {

            console.log("Error loading resumes:", error);

        }
    };


    useEffect(() => {
        loadResumes();
    }, []);


    const handleChange = (e) => {

        setResume({
            ...resume,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("resumeName", resume.resumeName);
            formData.append("version", resume.version);
            formData.append("uploadedDate", resume.uploadedDate);

            // PDF is required when adding, optional when editing
            if (file) {
                formData.append("file", file);
            }

            if (editingId) {

                await updateResume(editingId, formData);

                alert("Resume updated successfully!");

            } else {

                if (!file) {
                    alert("Please upload a PDF resume");
                    return;
                }

                await addResume(formData);

                alert("Resume uploaded successfully!");
            }

            resetForm();
            loadResumes();

        } catch (error) {

            console.log("Error saving resume:", error);
            alert("Error while saving resume");

        }
    };


    const handleEdit = (item) => {

        setEditingId(item.id);

        setResume({
            resumeName: item.resumeName,
            version: item.version,
            uploadedDate: item.uploadedDate
        });

        setFile(null);
        setShowForm(true);
    };


    const handleDelete = async (id) => {

        if (
            window.confirm(
                "Are you sure you want to delete this resume?"
            )
        ) {

            try {

                await deleteResume(id);

                loadResumes();

            } catch (error) {

                console.log("Error deleting resume:", error);

            }
        }
    };


    const resetForm = () => {

        setResume({
            resumeName: "",
            version: "",
            uploadedDate: ""
        });

        setFile(null);
        setEditingId(null);
        setShowForm(false);
    };


    return (

        <div className="applications-page">

            {/* Header */}

            <div className="page-header">

                <div>

                    <h1>Resume Versions</h1>

                    <p>
                        Upload and manage different versions of your resume.
                    </p>

                </div>


                <button
                    className="primary-btn"
                    onClick={() => {

                        resetForm();
                        setShowForm(true);

                    }}
                >

                    <Plus size={17} />

                    Upload Resume

                </button>

            </div>


            {/* Add / Edit Form */}

            {showForm && (

                <form
                    className="job-form-card"
                    onSubmit={handleSubmit}
                >

                    <div className="job-form-grid">

                        {/* Resume Name */}

                        <div className="form-group">

                            <label>RESUME NAME</label>

                            <input
                                name="resumeName"
                                required
                                placeholder="e.g. Java Developer Resume"
                                value={resume.resumeName}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Version */}

                        <div className="form-group">

                            <label>VERSION</label>

                            <input
                                name="version"
                                required
                                placeholder="e.g. v1"
                                value={resume.version}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Date */}

                        <div className="form-group">

                            <label>UPLOADED DATE</label>

                            <input
                                type="date"
                                name="uploadedDate"
                                required
                                value={resume.uploadedDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* PDF */}

                        <div className="form-group">

                            <label>
                                {editingId
                                    ? "REPLACE RESUME PDF (OPTIONAL)"
                                    : "RESUME PDF"}
                            </label>

                            <input
                                type="file"
                                accept=".pdf"
                                required={!editingId}
                                onChange={(e) =>
                                    setFile(e.target.files[0])
                                }
                            />

                            {editingId && (
                                <small>
                                    Leave empty to keep the existing PDF.
                                </small>
                            )}

                        </div>

                    </div>


                    {/* Form Buttons */}

                    <div className="form-actions">

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
                                ? "Update Resume"
                                : "Upload Resume"}

                        </button>

                    </div>

                </form>

            )}


            {/* Resume Table */}

            <div className="card applications-table">

                <table>

                    <thead>

                        <tr>

                            <th>Resume Name</th>
                            <th>File Name</th>
                            <th>Version</th>
                            <th>Uploaded Date</th>
                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {resumes.map((item) => (

                            <tr key={item.id}>

                                <td>
                                    <strong>
                                        {item.resumeName}
                                    </strong>
                                </td>

                                <td>
                                    {item.fileName}
                                </td>

                                <td>
                                    {item.version}
                                </td>

                                <td>
                                    {item.uploadedDate}
                                </td>

                                <td>

                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            handleEdit(item)
                                        }
                                        title="Edit Resume"
                                    >
                                        <Pencil size={16} />
                                    </button>


                                    <button
                                        className="icon-btn delete"
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                        title="Delete Resume"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {resumes.length === 0 && (

                    <div className="empty-state">
                        No resumes uploaded yet.
                    </div>

                )}

            </div>

        </div>
    );
}

export default Resume;