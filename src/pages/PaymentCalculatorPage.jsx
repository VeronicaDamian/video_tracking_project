import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime, formatCurrency } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import { fetchProjects } from '../services/api/projectsAPI'; 

const PaymentCalculator = () => {
    const navigate = useNavigate();

    // State for projects and UI
    const [unpaidProjects, setUnpaidProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProjects, setSelectedProjects] = useState({});
    const [processingPayment, setProcessingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Load projects on component mount
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const allProjects = await fetchProjects();

                // Filter for unpaid projects only
                const filteredProjects = allProjects.filter(project =>
                    project.paymentStatus === 'unpaid'
                );

                setUnpaidProjects(filteredProjects);

                // Initialize selected state object
                const initialSelected = {};
                filteredProjects.forEach(project => {
                    initialSelected[project.id] = false;
                });
                setSelectedProjects(initialSelected);

                setLoading(false);
            } catch (err) {
                console.error('Error loading projects:', err);
                setError(`Unable to load unpaid projects. Error: ${err.message}`);
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Calculate total for a project
    const calculateTotal = (project) => {
        if (!project || !project.client) return 0;
        const duration = parseFloat(project.duration) || 0;
        const rate = parseFloat(project.client?.paymentRate) || 0;
        return duration * rate;
    };

    // Calculate selected totals
    const calculateSelectedTotals = () => {
        let totalAmount = 0;
        let totalDuration = 0;
        let count = 0;

        unpaidProjects.forEach(project => {
            if (selectedProjects[project.id]) {
                totalAmount += calculateTotal(project);
                totalDuration += parseFloat(project.duration) || 0;
                count++;
            }
        });

        return { totalAmount, totalDuration, count };
    };

    // Toggle selection for a single project
    const toggleProjectSelection = (projectId) => {
        setSelectedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };

    // Check if all projects are selected
    const areAllProjectsSelected = () => {
        if (unpaidProjects.length === 0) return false;
        return unpaidProjects.every(project => selectedProjects[project.id]);
    };

    // Toggle selection for all projects
    const toggleSelectAll = () => {
        const allSelected = areAllProjectsSelected();

        // If all are selected, deselect all. Otherwise, select all.
        const newSelectedState = {};
        unpaidProjects.forEach(project => {
            newSelectedState[project.id] = !allSelected;
        });

        setSelectedProjects(newSelectedState);
    };

    // Process payment for selected projects
    const processPayment = async () => {
        // Check if any projects are selected
        const selectedIds = Object.entries(selectedProjects)
            .filter(([isSelected]) => isSelected)
            .map(([id]) => parseInt(id));

        if (selectedIds.length === 0) {
            setError('Please select at least one project to process payment.');
            return;
        }

        setProcessingPayment(true);
        setError(null);

        try {
            // Process each selected project
            for (const projectId of selectedIds) {
                await updateProject(projectId);
            }

            // Show success message and refresh projects list
            setPaymentSuccess(true);

            // Reset after 2 seconds
            setTimeout(() => {
                // Refresh the projects list
                const loadProjects = async () => {
                    try {
                        const allProjects = await fetchProjects();
                        const filteredProjects = allProjects.filter(project =>
                            project.paymentStatus === 'unpaid'
                        );
                        setUnpaidProjects(filteredProjects);

                        // Reset selected projects
                        const initialSelected = {};
                        filteredProjects.forEach(project => {
                            initialSelected[project.id] = false;
                        });
                        setSelectedProjects(initialSelected);

                        setPaymentSuccess(false);
                    } catch (err) {
                        console.error('Error refreshing projects:', err);
                        setError(`Unable to refresh projects. Error: ${err.message}`);
                    }
                };

                loadProjects();
            }, 2000);
        } catch (err) {
            console.error('Error processing payment:', err);
            setError(`Failed to process payment. Error: ${err.message}`);
        } finally {
            setProcessingPayment(false);
        }
    };

    // Update a single project
    const updateProject = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5174/api/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'Done',
                    paymentStatus: 'paid'
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error updating project ${projectId}:`, errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Error updating project ${projectId}:`, err);
            throw err;
        }
    };

    // Display loading spinner
    if (loading) {
        return <LoadingSpinner message="Loading unpaid projects..." />;
    }

    // Display empty state
    if (unpaidProjects.length === 0 && !error) {
        return (
            <div className="container py-4">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-primary text-white py-3">
                        <h2 className="mb-0">Payment Calculator</h2>
                    </div>
                    <div className="card-body p-4 text-center">
                        <div className="alert alert-info mb-3" role="alert">
                            <i className="bi bi-info-circle me-2"></i>
                            No unpaid projects found.
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/projects')}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Projects
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate totals for selected projects
    const { totalAmount, totalDuration, count } = calculateSelectedTotals();
    const anySelected = count > 0;

    return (
        <div className="container py-4">
            {/* Main Card */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Payment Calculator</h2>
                    <button
                        className="btn btn-light"
                        onClick={() => window.location.reload()}
                    >
                        <i className="bi bi-arrow-clockwise me-1"></i>
                        Refresh
                    </button>
                </div>

                <div className="card-body p-4">
                    {/* Error alert */}
                    {error && (
                        <ErrorAlert message={error} />
                    )}

                    {/* Success message */}
                    {paymentSuccess && (
                        <div className="alert alert-success mb-4" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Payment processed successfully! The selected projects have been marked as paid and completed.
                        </div>
                    )}

                    {/* Projects table */}
                    <div className="table-responsive mb-4">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={areAllProjectsSelected()}
                                                onChange={toggleSelectAll}
                                                id="selectAllCheckbox"
                                            />
                                            <label className="form-check-label" htmlFor="selectAllCheckbox">
                                                Select All
                                            </label>
                                        </div>
                                    </th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Duration</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unpaidProjects.map(project => {
                                    const total = calculateTotal(project);
                                    const isSelected = selectedProjects[project.id] || false;

                                    return (
                                        <tr
                                            key={project.id}
                                            className={isSelected ? 'table-primary' : ''}
                                            onClick={() => toggleProjectSelection(project.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>
                                                <div className="form-check" onClick={e => e.stopPropagation()}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleProjectSelection(project.id)}
                                                        id={`project-${project.id}`}
                                                    />
                                                    <label className="form-check-label" htmlFor={`project-${project.id}`}>

                                                    </label>
                                                </div>
                                            </td>
                                            <td>{project.title}</td>
                                            <td>{project.client?.name || 'Unknown'}</td>
                                            <td>{formatTime(project.duration)}</td>
                                            <td>{formatCurrency(project.client?.paymentRate || 0)}/sec</td>
                                            <td className="fw-bold">{formatCurrency(total)}</td>
                                            <td>
                                                <span className={`badge ${project.status === 'Done' ? 'bg-success' : project.status === 'In Progress' ? 'bg-warning' : 'bg-secondary'}`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Payment summary card */}
                    <div className="card mb-4">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">
                                <i className="bi bi-calculator me-2"></i>
                                Payment Summary
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <h6 className="text-muted">Selected Projects</h6>
                                    <h3>{count}</h3>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <h6 className="text-muted">Total Duration</h6>
                                    <h3>{formatTime(totalDuration)}</h3>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <h6 className="text-muted">Total Amount</h6>
                                    <h3 className="text-primary">{formatCurrency(totalAmount)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-success btn-lg w-100"
                                disabled={!anySelected || processingPayment}
                                onClick={processPayment}
                            >
                                {processingPayment ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Finish Payment
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="alert alert-info mb-0" role="alert">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Note:</strong> Completing payment will mark the selected projects as "Done" and change their payment status to "paid".
                    </div>
                </div>
            </div>

            {/* Back button */}
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/projects')}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Projects
                </button>
            </div>
        </div>
    );
};

export default PaymentCalculator;