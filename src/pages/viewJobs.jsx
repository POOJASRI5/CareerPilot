import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob } from "../services/JobService";

function ViewJobs() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    const navigate = useNavigate();

    const loadJobs = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response.data);
        } catch (error) {
            console.log("Error loading jobs:", error);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleDelete = async (id) => {

        if (window.confirm("Are you sure you want to delete this application?")) {

            try {
                await deleteJob(id);
                loadJobs();
            } catch (error) {
                console.log("Error deleting job:", error);
            }
        }
    };

    const filteredJobs = jobs
        .filter((job) =>
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.role.toLowerCase().includes(search.toLowerCase())
        )
        .filter((job) =>
            status === "" || job.status === status
        )
        .sort((a, b) => {

            if (sortOrder === "newest") {
                return new Date(b.appliedDate) - new Date(a.appliedDate);
            }

            return new Date(a.appliedDate) - new Date(b.appliedDate);
        });

    return (
        <div className="applications-page">

            {/* Header */}
            <div className="page-header">

                <div>
                    <h1>Job Applications</h1>
                    <p>
                        Track and manage all your job applications.
                    </p>
                </div>

                <Link to="/add" className="primary-btn">
                    <Plus size={17} />
                    Add Application
                </Link>

            </div>


            {/* Search, Filter and Sort */}
            <div className="application-toolbar">

                <div className="search-input">

                    <Search size={17} />

                    <input
                        type="text"
                        placeholder="Search company or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">
                        All Statuses
                    </option>

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


                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="newest">
                        Date: Newest First
                    </option>

                    <option value="oldest">
                        Date: Oldest First
                    </option>
                </select>

            </div>


            {/* Applications Table */}
            <div className="card applications-table">

                <table>

                    <thead>

                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Location</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>


                    <tbody>

                        {filteredJobs.map((job) => (

                            <tr key={job.id}>

                                <td>
                                    <strong>
                                        {job.company}
                                    </strong>
                                </td>

                                <td>
                                    {job.role}
                                </td>

                                <td>
                                    {job.location}
                                </td>

                                <td>
                                    {job.appliedDate}
                                </td>

                                <td>

                                    <span
                                        className={`status ${job.status.toLowerCase()}`}
                                    >
                                        {job.status}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            navigate(`/edit/${job.id}`)
                                        }
                                    >
                                        <Pencil size={16} />
                                    </button>


                                    <button
                                        className="icon-btn delete"
                                        onClick={() =>
                                            handleDelete(job.id)
                                        }
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {filteredJobs.length === 0 && (
                    <div className="empty-state">
                        No applications found.
                    </div>
                )}

            </div>

        </div>
    );
}

export default ViewJobs;