import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProjectsList from '../components/projects/ProjectsList';
import NewProjectForm from '../components/projects/NewProjectForm';
import UpdateProjectForm from '../components/projects//UpdateProjectForm';
import NewClientForm from '../components/clients/NewClientForm';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5174/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://localhost:5174/api/clients')
      .then(response => response.json())
      .then(data => {
        setClients(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDeleteProject = (id) => {
    fetch(`http://localhost:5174/api/projects/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Projects</h2>
      <div className="mb-4">
        <Link to="/projects/new-project" className="btn btn-primary me-2">Add New Project</Link>
        <Link to="/projects/new-client" className="btn btn-primary me-2">Add New Client</Link>
        <Link to="/clients" className="btn btn-primary me-2">Clients</Link>
      </div>

      <Routes>
        <Route path="/" element={<ProjectsList projects={projects} clients={clients} onDelete={handleDeleteProject} />} />
        <Route path="new-project" element={<NewProjectForm clients={clients} />} />
        <Route path="new-client" element={<NewClientForm />} />
        <Route path="update/:id" element={<UpdateProjectForm clients={clients} />} />
      </Routes>
    </div>
  );
};

export default ProjectsPage;