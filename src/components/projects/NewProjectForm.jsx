import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getMetadata } from "video-metadata-thumbnails";
import { createProject } from "../../services/api/projectsAPI";
import { useProjectContext } from "../../context/ProjectContext";

const NewProjectForm = ({ clients, onAddProject }) => {
    const [newProject, setNewProject] = useState({
        title: "",
        client: {
            id: "",
            name: "",
            niche: "",
            paymentRate: 0,
        },
        status: "Not Started",
        duration: 0,
        paymentStatus: "unpaid",
        tags: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Get the project context
    const { notifyProjectChange } = useProjectContext();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("client.")) {
            const clientField = name.split(".")[1];
            setNewProject({
                ...newProject,
                client: {
                    ...newProject.client,
                    [clientField]:
                        clientField === "paymentRate" ? parseFloat(value) : value,
                },
            });
        } else {
            setNewProject({ ...newProject, [name]: value });
        }
    };

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;
        if (selectedClientId === "new-client") {
            navigate("/clients/new");
        } else {
            const selectedClient = clients.find(
                (client) => client.id === parseInt(selectedClientId)
            );
            setNewProject({
                ...newProject,
                client: selectedClient || {
                    id: "",
                    name: "",
                    niche: "",
                    paymentRate: 0,
                },
            });
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const projectToSave = {
                ...newProject,
                tags: newProject.tags
                    ? newProject.tags.split(",").map((tag) => tag.trim())
                    : [],
            };

            const createdProject = await createProject(projectToSave);

            // If callback is provided, call it with the new project
            if (onAddProject) {
                onAddProject(createdProject);
            } else {
                // Otherwise, notify via context
                notifyProjectChange();
            }

            navigate("/projects");
        } catch (error) {
            console.error("Error adding project:", error);
            setError("Failed to add project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFileName(file.name);

            try {
                const metadata = await getMetadata(file);
                setNewProject({
                    ...newProject,
                    title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
                    duration: Math.round(metadata.duration || 0),
                });
            } catch (err) {
                console.error("Error reading video metadata:", err);
                // Still set the title even if metadata reading fails
                setNewProject({
                    ...newProject,
                    title: file.name.replace(/\.[^/.]+$/, ""),
                });
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "video/*": [] },
        maxFiles: 1,
    });

    // Format seconds to minutes and seconds
    const formatDuration = (seconds) => {
        if (!seconds) return "0m 0s";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
                <h3 className="card-title mb-0">Add New Project</h3>
            </div>

            <div className="card-body p-4">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleAddProject}>
                    <div className="row g-4">
                        {/* Left Column */}
                        <div className="col-lg-6">
                            <div className="mb-4">
                                <label htmlFor="title" className="form-label fw-bold">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newProject.title}
                                    onChange={handleInputChange}
                                    className="form-control form-control-lg shadow-sm"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="client" className="form-label fw-bold">
                                    Client
                                </label>
                                <select
                                    id="client"
                                    name="client.id"
                                    value={newProject.client.id}
                                    onChange={handleClientChange}
                                    className="form-select shadow-sm"
                                    required
                                >
                                    <option value="">Select Client</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                        </option>
                                    ))}
                                    <option value="new-client">➕ Create New Client</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="duration" className="form-label fw-bold">
                                    Video Duration
                                </label>
                                <div className="input-group shadow-sm">
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={newProject.duration}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Duration in seconds"
                                        min="0"
                                        required
                                    />
                                    <span className="input-group-text">seconds</span>
                                </div>
                                {newProject.duration > 0 && (
                                    <div className="form-text">
                                        Converted: {formatDuration(newProject.duration)}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Video Upload</label>
                                <div
                                    {...getRootProps({
                                        className: `dropzone border rounded-3 p-4 text-center shadow-sm ${isDragActive ? "border-primary bg-light" : ""
                                            }`,
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <div className="py-3">
                                            <i className="bi bi-cloud-arrow-down display-4 text-primary"></i>
                                            <p className="mt-2">Drop the video file here...</p>
                                        </div>
                                    ) : selectedFileName ? (
                                        <div className="py-3">
                                            <i className="bi bi-check-circle-fill display-4 text-success"></i>
                                            <p className="mt-2">Selected: {selectedFileName}</p>
                                            <p className="text-muted">
                                                Drag & drop another video or click to replace
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="py-3">
                                            <i className="bi bi-cloud-upload display-4 text-muted"></i>
                                            <p className="mt-2">
                                                Drag & drop a video file here or click to select
                                            </p>
                                            <p className="text-muted small">
                                                This will auto-fill the project title and duration
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-6">
                            <div className="mb-4">
                                <label htmlFor="status" className="form-label fw-bold">
                                    Project Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newProject.status}
                                    onChange={handleInputChange}
                                    className="form-select shadow-sm"
                                    required
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="paymentStatus" className="form-label fw-bold">
                                    Payment Status
                                </label>
                                <select
                                    id="paymentStatus"
                                    name="paymentStatus"
                                    value={newProject.paymentStatus}
                                    onChange={handleInputChange}
                                    className="form-select shadow-sm"
                                    required
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tags" className="form-label fw-bold">
                                    Tags
                                </label>
                                <div className="input-group shadow-sm">
                                    <span className="input-group-text">
                                        <i className="bi bi-tags"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={newProject.tags}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="e.g. youtube, marketing, tutorial"
                                    />
                                </div>
                                <div className="form-text">Separate tags with commas</div>
                            </div>

                            {/* Client Info Preview */}
                            {newProject.client && newProject.client.id && (
                                <div className="card bg-light mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h6 className="mb-0">Client Information</h6>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-1">
                                            <strong>Name:</strong> {newProject.client.name}
                                        </p>
                                        {newProject.client.niche && (
                                            <p className="mb-1">
                                                <strong>Niche:</strong> {newProject.client.niche}
                                            </p>
                                        )}
                                        <p className="mb-0">
                                            <strong>Rate:</strong>
                                            {newProject.client.paymentRate ? (
                                                <span className="text-success">
                                                    {" "}
                                                    ${newProject.client.paymentRate}/hour
                                                </span>
                                            ) : (
                                                <span className="text-muted"> Not set</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="d-flex justify-content-between mt-4">
                                <Link
                                    to="/projects"
                                    className="btn btn-outline-secondary shadow-sm"
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-primary shadow-sm"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Create Project
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProjectForm;