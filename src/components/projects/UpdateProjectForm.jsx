import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProjectForm = ({ clients }) => {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: '',
    client: {
      id: '',
      name: '',
      niche: '',
      paymentRate: 0,
    },
    status: 'Not Started',
    duration: 0,
    paymentStatus: 'unpaid',
    tags: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5174/api/projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Project with ID ${id} not found`);
        }
        return response.json();
      })
      .then(data => {
        setProject({
          ...data,
          tags: data.tags.join(', '),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('client.')) {
      const clientField = name.split('.')[1];
      setProject({ ...project, client: { ...project.client, [clientField]: clientField === 'paymentRate' ? parseFloat(value) : value } });
    } else {
      setProject({ ...project, [name]: value });
    }
  };

  const handleClientChange = (e) => {
    const selectedClient = clients.find(client => client.id === parseInt(e.target.value));
    setProject({ ...project, client: selectedClient });
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const projectToUpdate = {
      ...project,
      tags: project.tags.split(',').map(tag => tag.trim()),
    };

    fetch(`http://localhost:5174/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectToUpdate),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update project');
        }
        return response.json();
      })
      .then(() => {
        navigate('/projects');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Project</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdateProject} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Project Name"
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="client.id"
                value={project.client.id}
                onChange={handleClientChange}
                className="form-control"
                required
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                name="status"
                value={project.status}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="duration"
                value={project.duration}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Video Length (seconds)"
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="paymentStatus"
                value={project.paymentStatus}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="tags"
                value={project.tags}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Tags (comma separated)"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Update Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectForm;