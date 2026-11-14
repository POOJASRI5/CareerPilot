import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/JobService";
import { Save, X } from "lucide-react";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        company: "",
        role: "",
        location: "",
        appliedDate: "",
        status: "Applied",
        jobLink: "",
        notes: ""
    });

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {
        try {
            const response = await getJobById(id);
            setJob(response.data);
        } catch (error) {
            console.log("Error loading job:", error);
        }
    };

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateJob(id, job);

            alert("Job Updated Successfully!");

            navigate("/view");

        } catch (error) {
            console.log("Error updating job:", error);
            alert("Error while updating job");
        }
    };

    return (
        <div className="job-form-page">

            {/* Page Header */}
            <div className="page-header">

                <div>
                    <h1>Edit Job Application</h1>

                    <p>
                        Update your application details.
                    </p>
                </div>

            </div>


            {/* Edit Form */}
            <form
                className="job-form-card"
                onSubmit={handleSubmit}
            >

                <div className="job-form-grid">

                    {/* Company */}
                    <div className="form-group">

                        <label>
                            COMPANY NAME
                        </label>

                        <input
                            type="text"
                            name="company"
                            required
                            value={job.company}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Role */}
                    <div className="form-group">

                        <label>
                            JOB ROLE
                        </label>

                        <input
                            type="text"
                            name="role"
                            required
                            value={job.role}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Location */}
                    <div className="form-group">

                        <label>
                            LOCATION
                        </label>

                        <input
                            type="text"
                            name="location"
                            required
                            value={job.location}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Applied Date */}
                    <div className="form-group">

                        <label>
                            APPLIED DATE
                        </label>

                        <input
                            type="date"
                            name="appliedDate"
                            required
                            value={job.appliedDate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Status */}
                    <div className="form-group">

                        <label>
                            APPLICATION STATUS
                        </label>

                        <select
                            name="status"
                            required
                            value={job.status}
                            onChange={handleChange}
                        >

                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Offer">
                                Offer
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                        </select>

                    </div>


                    {/* Job Link */}
                    <div className="form-group">

                        <label>
                            JOB POSTING LINK
                        </label>

                        <input
                            type="url"
                            name="jobLink"
                            required
                            value={job.jobLink}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Notes */}
                    <div className="form-group full">

                        <label>
                            NOTES
                            <span className="optional">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            name="notes"
                            value={job.notes || ""}
                            onChange={handleChange}
                            placeholder="Recruiter name, referral, interview details, next steps..."
                        />

                    </div>

                </div>


                {/* Buttons */}
                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate("/view")}
                    >
                        <X size={16} />
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        <Save size={16} />
                        Update Application
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditJob;