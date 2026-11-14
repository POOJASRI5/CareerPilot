import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJob } from "../services/JobService";
import { Save, X } from "lucide-react";

function AddJob() {

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

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addJob(job);

            alert("Job Added Successfully!");

            navigate("/view");

        } catch (error) {

            console.log(error);

            alert("Error while adding job");
        }
    };

    return (
        <div className="job-form-page">

            {/* Page Header */}
            <div className="page-header">

                <div>
                    <h1>Add Job Application</h1>

                    <p>
                        Track your next career opportunity.
                    </p>
                </div>

            </div>


            {/* Form */}
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
                            placeholder="e.g. Google"
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
                            placeholder="e.g. Frontend Engineer"
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
                            placeholder="e.g. Chennai"
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
                            placeholder="https://..."
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
                            placeholder="Recruiter name, referral, interview details, next steps..."
                            value={job.notes}
                            onChange={handleChange}
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
                        Save Application
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddJob;