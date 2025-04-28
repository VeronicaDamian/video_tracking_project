import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProjectContext } from '../../context/ProjectContext.jsx';

const UpdateProjectForm = ({ clients, onUpdateProject }) => {
    const { id } = useParams();
    const [project, setProject] = useState({
        title: '',
        client: {
            id: '',
            name: '',
            niche: '',
            paymentRate: 0,
        },
        status: 'Not Started',
        duration: 0,
        paymentStatus: 'unpaid',
        tags: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Get the project context
    const { notifyProjectChange } = useProjectContext();

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5174/api/projects/${id}`);

                if (!response.ok) {
                    throw new Error(`Project with ID ${id} not found`);
                }

                const data = await response.json();

                setProject({
                    ...data,
                    tags: data.tags.join(', '),
                });
            } catch (error) {
                console.error('Error fetching project:', error);
                setError(`Failed to load project: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('client.')) {
            const clientField = name.split('.')[1];
            setProject({
                ...project,
                client: {
                    ...project.client,
                    [clientField]: clientField === 'paymentRate' ? parseFloat(value) : value
                }
            });
        } else {
            setProject({ ...project, [name]: value });
        }
    };

    const handleClientChange = (e) => {
        const selectedClient = clients.find(client => client.id === parseInt(e.target.value));
        setProject({
            ...project, client: selectedClient || {
                id: '',
                name: '',
                niche: '',
                paymentRate: 0
            }
        });
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const projectToUpdate = {
                ...project,
                tags: project.tags.split(',').map(tag => tag.trim()),
            };

            const response = await fetch(`http://localhost:5174/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectToUpdate),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            const updatedProject = await response.json();

            // If callback is provided, call it with the updated project
            if (onUpdateProject) {
                onUpdateProject(updatedProject);
            } else {
                // Otherwise, notify via context
                notifyProjectChange();
            }

            navigate('/projects');
        } catch (error) {
            console.error('Error updating project:', error);
            setError(`Failed to update project: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format seconds to minutes and seconds
    const formatDuration = (seconds) => {
        if (!seconds) return '0m 0s';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    if (isLoading) {
        return (
            <div className="card shadow-sm">
                <div className="card-body p-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading project data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card shadow-sm border-danger">
                <div className="card-body p-4 text-center">
                    <i className="bi bi-exclamation-triangle-fill text-danger display-1"></i>
                    <h4 className="mt-3 text-danger">Error</h4>
                    <p>{error}</p>
                    <Link to="/projects" className="btn btn-primary mt-3">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
                <h3 className="card-title mb-0">Update Project</h3>
            </div>

            <div className="card-body p-4">
                <form onSubmit={handleUpdateProject}>
                    <div className="row g-4">
                        {/* Left Column */}
                        <div className="col-lg-6">
                            <div className="mb-4">
                                <label htmlFor="title" className="form-label fw-bold">Project Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={project.title}
                                    onChange={handleInputChange}
                                    className="form-control form-control-lg shadow-sm"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="client" className="form-label fw-bold">Client</label>
                                <select
                                    id="client"
                                    name="client.id"
                                    value={project.client.id}
                                    onChange={handleClientChange}
                                    className="form-select shadow-sm"
                                    required
                                >
                                    <option value="">Select Client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="duration" className="form-label fw-bold">Video Duration</label>
                                <div className="input-group shadow-sm">
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={project.duration}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Duration in seconds"
                                        min="0"
                                        required
                                    />
                                    <span className="input-group-text">seconds</span>
                                </div>
                                {project.duration > 0 && (
                                    <div className="form-text">
                                        Converted: {formatDuration(project.duration)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-6">
                            <div className="mb-4">
                                <label htmlFor="status" className="form-label fw-bold">Project Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={project.status}
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
                                <label htmlFor="paymentStatus" className="form-label fw-bold">Payment Status</label>
                                <select
                                    id="paymentStatus"
                                    name="paymentStatus"
                                    value={project.paymentStatus}
                                    onChange={handleInputChange}
                                    className="form-select shadow-sm"
                                    required
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tags" className="form-label fw-bold">Tags</label>
                                <div className="input-group shadow-sm">
                                    <span className="input-group-text">
                                        <i className="bi bi-tags"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={project.tags}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="e.g. youtube, marketing, tutorial"
                                    />
                                </div>
                                <div className="form-text">Separate tags with commas</div>
                            </div>

                            {/* Client Info Preview */}
                            {project.client && project.client.id && (
                                <div className="card bg-light mb-4 shadow-sm">
                                    <div className="card-header">
                                        <h6 className="mb-0">Client Information</h6>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-1"><strong>Name:</strong> {project.client.name}</p>
                                        {project.client.niche && (
                                            <p className="mb-1"><strong>Niche:</strong> {project.client.niche}</p>
                                        )}
                                        <p className="mb-0">
                                            <strong>Rate:</strong>
                                            {project.client.paymentRate ? (
                                                <span className="text-success"> ${project.client.paymentRate}/hour</span>
                                            ) : (
                                                <span className="text-muted"> Not set</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <Link to="/projects" className="btn btn-outline-secondary shadow-sm">
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
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    Update Project
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProjectForm;