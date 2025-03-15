import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { getMetadata } from 'video-metadata-thumbnails';
import { createProject } from '../../services/api/projectsApi';

const NewProjectForm = ({ clients, onAddProject }) => {
  const [newProject, setNewProject] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('client.')) {
      const clientField = name.split('.')[1];
      setNewProject({ ...newProject, client: { ...newProject.client, [clientField]: clientField === 'paymentRate' ? parseFloat(value) : value } });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleClientChange = (e) => {
    const selectedClientId = e.target.value;
    if (selectedClientId === 'new-client') {
      navigate('/projects/new-client');
    } else {
      const selectedClient = clients.find(client => client.id === parseInt(selectedClientId));
      setNewProject({ ...newProject, client: selectedClient });
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const projectToSave = {
      ...newProject,
      tags: newProject.tags.split(',').map(tag => tag.trim())
    };
    try {
      const newProject = await createProject(projectToSave);
      onAddProject(newProject);
      navigate('/projects');
    } catch (error) {
      console.error('There was an error adding the project!', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    getMetadata(file).then(metadata => {
      setNewProject({
        ...newProject,
        title: file.name,
        duration: Math.round(metadata.duration),
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'video/*' });

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Project</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleAddProject} className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Project Name"
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="client.id"
                value={newProject.client.id}
                onChange={handleClientChange}
                className="form-control"
                required
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
                <option value="new-client">Create New Client</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                name="status"
                value={newProject.status}
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
                value={newProject.duration}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Video Length (seconds)"
                required
              />
            </div>
            <div className="mb-3">
              <select
                name="paymentStatus"
                value={newProject.paymentStatus}
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
                value={newProject.tags}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Tags (comma separated)"
              />
            </div>
            <div className="mb-3">
              <div {...getRootProps({ className: 'dropzone border p-4 text-center' })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the video file here...</p>
                ) : (
                  <p>Select a video</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Add Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;