import React, { useEffect, useState } from 'react';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5174/api/clients')
      .then(response => response.json())
      .then(data => {
        setClients(data);
      })
      .catch(error => {
        console.error('There was an error fetching the clients!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Clients</h2>
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
    </div>
  );
};

export default ClientsPage;