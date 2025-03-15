import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, clientFilter, setClientFilter, paymentStatusFilter, setPaymentStatusFilter, clients }) => {
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-3">
          <Link to="/projects/new-project" className="btn btn-primary w-100">Add New Project</Link>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Link to="/clients" className="btn btn-secondary w-100">Clients</Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
          >
            <option value="">All Clients</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
          >
            <option value="">All Payment Statuses</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProjectsFilter;