import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { fetchClients } from '../services/api/clientsAPI';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ClientsList from '../components/clients/ClientsList';
import NewClientForm from '../components/clients/NewClientForm';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        setLoading(true);
        const data = await fetchClients();
        setClients(data);
        setLoading(false);
    };

    if (loading) {
        return <LoadingSpinner message="Loading clients..." />;
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Clients</h2>
                    <Link to="/clients/new" className="btn btn-light">
                        <i className="bi bi-person-plus me-2"></i>
                        Add New Client
                    </Link>
                </div>

                <div className="card-body p-4">
                    <Routes>
                        <Route path="/" element={<ClientsList clients={clients} onRefresh={loadClients} />} />
                        <Route path="/new" element={<NewClientForm onClientAdded={loadClients} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;