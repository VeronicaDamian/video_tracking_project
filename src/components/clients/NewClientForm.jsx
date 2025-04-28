import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorAlert from '../common/ErrorAlert';

const NewClientForm = ({ onClientAdded }) => {
    const [newClient, setNewClient] = useState({
        name: '',
        niche: '',
        paymentRate: 0.4,
        email: '',
        phone: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({
            ...newClient,
            [name]: name === 'paymentRate' ? parseFloat(value) : value
        });
    };

    const handleAddClient = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5174/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                throw new Error('Failed to add client');
            }

            setLoading(false);

            // Call the callback to refresh the client list
            if (onClientAdded) {
                onClientAdded();
            }

            // Navigate back to clients list
            navigate('/clients');
        } catch (error) {
            console.error('There was an error adding the client!', error);
            setError('Failed to add client. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-light">
                        <h4 className="mb-0">
                            <i className="bi bi-person-plus me-2"></i>
                            Add New Client
                        </h4>
                    </div>
                    <div className="card-body p-4">
                        {error && <ErrorAlert message={error} />}

                        <form onSubmit={handleAddClient}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">Client Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newClient.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Enter client name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="niche" className="form-label">Content Niche</label>
                                    <input
                                        type="text"
                                        id="niche"
                                        name="niche"
                                        value={newClient.niche}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="e.g., Gaming, Cooking, Tech Reviews"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="paymentRate" className="form-label">Payment Rate ($ per second)</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input
                                            type="number"
                                            id="paymentRate"
                                            name="paymentRate"
                                            value={newClient.paymentRate}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                        <span className="input-group-text">/sec</span>
                                    </div>
                                    <div className="form-text text-muted">
                                        Payment rate per second of video content
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Email (Optional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={newClient.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="client@example.com"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="phone" className="form-label">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={newClient.phone}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="555-123-4567"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={newClient.notes}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="3"
                                    placeholder="Additional information about this client..."
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <Link to="/clients" className="btn btn-outline-secondary">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle me-2"></i>
                                            Add Client
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewClientForm;