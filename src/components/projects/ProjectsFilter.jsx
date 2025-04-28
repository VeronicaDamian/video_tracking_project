import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsFilter = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clientFilter,
    setClientFilter,
    paymentStatusFilter,
    setPaymentStatusFilter,
    clients
}) => {
    const handleResetFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setClientFilter('');
        setPaymentStatusFilter('');
    };

    return (
        <div className="mb-4">
            {/* Action Buttons Row */}
            <div className="row mb-4 g-3">
                <div className="col-md-4 col-lg-3">
                    <Link to="/projects/new-project" className="btn btn-primary w-100 d-flex align-items-center justify-content-center shadow-sm">
                        <i className="bi bi-plus-circle me-2"></i>
                        New Project
                    </Link>
                </div>
                <div className="col-md-4 col-lg-6">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search projects by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setSearchTerm('')}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-md-4 col-lg-3">
                    <Link to="/clients" className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center shadow-sm">
                        <i className="bi bi-people me-2"></i>
                        Manage Clients
                    </Link>
                </div>
            </div>

            {/* Filters Row */}
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <i className="bi bi-funnel me-2"></i>
                            Filters
                        </h5>
                        {(statusFilter || clientFilter || paymentStatusFilter) && (
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleResetFilters}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Status</label>
                                <select
                                    className="form-select shadow-sm"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Client</label>
                                <select
                                    className="form-select shadow-sm"
                                    value={clientFilter}
                                    onChange={(e) => setClientFilter(e.target.value)}
                                >
                                    <option value="">All Clients</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-label fw-bold">Payment Status</label>
                                <select
                                    className="form-select shadow-sm"
                                    value={paymentStatusFilter}
                                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                                >
                                    <option value="">All Payment Statuses</option>
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsFilter;