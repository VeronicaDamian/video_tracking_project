import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = ({ projects, onDelete }) => {
    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this project?');
        if (confirmed) {
            onDelete(id);
        }
    };

    // Format video duration to minutes and seconds
    const formatDuration = (seconds) => {
        if (!seconds) return '0m 0s';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Done':
                return 'bg-success';
            case 'In Progress':
                return 'bg-warning text-dark';
            case 'Not Started':
                return 'bg-secondary';
            default:
                return 'bg-info';
        }
    };

    // Get payment status badge class
    const getPaymentBadgeClass = (paymentStatus) => {
        return paymentStatus === 'paid' ? 'bg-success' : 'bg-danger';
    };

    return (
        <div className="table-responsive shadow-sm">
            <table className="table table-hover border">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Client</th>
                        <th scope="col">Status</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Tags</th>
                        <th scope="col" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td className="align-middle fw-bold">{project.title}</td>
                            <td className="align-middle">
                                {project.client?.name ? (
                                    <span>{project.client.name}</span>
                                ) : (
                                    <span className="text-muted fst-italic">No Client</span>
                                )}
                            </td>
                            <td className="align-middle">
                                <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                                    {project.status}
                                </span>
                            </td>
                            <td className="align-middle">
                                {formatDuration(project.duration)}
                            </td>
                            <td className="align-middle">
                                <span className={`badge ${getPaymentBadgeClass(project.paymentStatus)}`}>
                                    {project.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                </span>
                            </td>
                            <td className="align-middle">
                                {project.tags && project.tags.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-1">
                                        {project.tags.map((tag, index) => (
                                            <span key={index} className="badge bg-light text-dark border">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-muted fst-italic">No tags</span>
                                )}
                            </td>
                            <td className="align-middle">
                                <div className="d-flex gap-2 justify-content-center">
                                    <Link
                                        to={`/projects/update/${project.id}`}
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-pencil-fill me-1"></i> Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        <i className="bi bi-trash-fill me-1"></i> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsList;