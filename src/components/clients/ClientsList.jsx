import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientsList = ({ clients }) => {
    const navigate = useNavigate();

    if (clients.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-4">
                    <i className="bi bi-people-fill text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
                <h4 className="text-muted">No clients found</h4>
                <p className="text-muted mb-4">Add your first client to get started</p>
                <Link to="/clients/new" className="btn btn-primary">
                    <i className="bi bi-person-plus me-2"></i>
                    Add New Client
                </Link>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Client Name</th>
                        <th>Niche</th>
                        <th>Payment Rate</th>
                        <th>Contact</th>
                        <th>Projects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td className="fw-bold">{client.name}</td>
                            <td>
                                <span className="badge bg-info text-dark">
                                    {client.niche}
                                </span>
                            </td>
                            <td>${client.paymentRate.toFixed(2)}/sec</td>
                            <td>
                                {client.email && (
                                    <a href={`mailto:${client.email}`} className="me-2 text-decoration-none">
                                        <i className="bi bi-envelope"></i>
                                    </a>
                                )}
                                {client.phone && (
                                    <a href={`tel:${client.phone}`} className="text-decoration-none">
                                        <i className="bi bi-telephone"></i>
                                    </a>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => navigate(`/projects?client=${client.id}`)}
                                >
                                    <i className="bi bi-collection-play me-1"></i>
                                    View Projects
                                </button>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-sm btn-outline-secondary">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="bi bi-trash"></i>
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

export default ClientsList;