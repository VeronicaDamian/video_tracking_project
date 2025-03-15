import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewClientForm = () => {
  const [newClient, setNewClient] = useState({
    name: '',
    niche: '',
    paymentRate: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: name === 'paymentRate' ? parseFloat(value) : value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    fetch('http://localhost:5174/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/projects');
      })
      .catch(error => {
        console.error('There was an error adding the client!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Client</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleAddClient} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Client Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="niche"
                value={newClient.niche}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Client Niche"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                step="0.01"
                name="paymentRate"
                value={newClient.paymentRate}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Payment Rate"
                required
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Add Client</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClientForm;