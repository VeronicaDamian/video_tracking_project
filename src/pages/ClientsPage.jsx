import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NewClientForm from '../components/clients/NewClientForm';
import { fetchClients } from '../services/api/clientsApi';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error('There was an error fetching the clients!', error);
      }
    };

    getClients();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Clients</h2>
      <div className="mb-4">
        <Link to="/clients/new-client" className="btn btn-primary">Add New Client</Link>
      </div>
      <Routes>
        <Route path="/" element={
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Niche</th>
                <th>Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.niche}</td>
                  <td>{client.paymentRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        } />
        <Route path="new-client" element={<NewClientForm />} />
      </Routes>
    </div>
  );
};

export default ClientsPage;