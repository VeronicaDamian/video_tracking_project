import React, { useEffect, useState } from 'react';

const PaymentCalculatorPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5174/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data.filter(project => project.paymentStatus === 'unpaid'));
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  const handleCheckboxChange = (projectId) => {
    setSelectedProjects(prevSelectedProjects => {
      if (prevSelectedProjects.includes(projectId)) {
        return prevSelectedProjects.filter(id => id !== projectId);
      } else {
        return [...prevSelectedProjects, projectId];
      }
    });
  };

  const handleSelectAll = () => {
    const allProjectIds = projects.map(project => project.id);
    setSelectedProjects(allProjectIds);
  };

  const handleDeselectAll = () => {
    setSelectedProjects([]);
  };

  const calculateTotalPayment = () => {
    return selectedProjects.reduce((total, projectId) => {
      const project = projects.find(project => project.id === projectId);
      return total + (project.client.paymentRate * project.duration);
    }, 0);
  };

  const handleFinishPayment = () => {
    const updatedProjects = projects.map(project => {
      if (selectedProjects.includes(project.id)) {
        return { ...project, paymentStatus: 'paid' };
      }
      return project;
    });

    setProjects(updatedProjects.filter(project => project.paymentStatus !== 'paid'));
    setSelectedProjects([]);

    selectedProjects.forEach(projectId => {
      const project = projects.find(project => project.id === projectId);
      const updatedProject = { ...project, paymentStatus: 'paid' };

      fetch(`http://localhost:5174/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
        .then(response => {
          return response.json();
        })
        .catch(error => {
          console.error('There was an error updating the project!', error);
        });
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Payment Calculator</h2>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSelectAll}>Select All</button>
        <button className="btn btn-secondary me-2" onClick={handleDeselectAll}>Deselect All</button>
        <button className="btn btn-success" onClick={handleFinishPayment}>Finish Payment</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>Project Name</th>
            <th>Client Name</th>
            <th>Video Length</th>
            <th>Payment Rate</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProjects.includes(project.id)}
                  onChange={() => handleCheckboxChange(project.id)}
                />
              </td>
              <td>{project.title}</td>
              <td>{project.client.name}</td>
              <td>{project.duration} Seconds</td>
              <td>{project.client.paymentRate}</td>
              <td>{project.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h4>Total Payment: ${calculateTotalPayment().toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default PaymentCalculatorPage;