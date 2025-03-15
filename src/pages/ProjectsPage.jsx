import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ProjectsList from '../components/projects/ProjectsList';
import NewProjectForm from '../components/projects/NewProjectForm';
import UpdateProjectForm from '../components/projects/UpdateProjectForm';
import ProjectsFilter from '../components/projects/ProjectsFilter';
import ProjectsPagePagination from '../components/projects/ProjectsPagePagination';
import { fetchProjects, deleteProject } from '../services/api/projectsAPI';
import { fetchClients } from '../services/api/clientsAPI';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10; 
  const location = useLocation();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('There was an error fetching the projects!', error);
      }
    };

    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error('There was an error fetching the clients!', error);
      }
    };

    getProjects();
    getClients();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('There was an error deleting the project!', error);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const filteredProjects = projects
    .filter(project => {
      return (
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || project.status === statusFilter) &&
        (clientFilter === '' || project.client.id === parseInt(clientFilter)) &&
        (paymentStatusFilter === '' || project.paymentStatus === paymentStatusFilter)
      );
    })
    .sort((a, b) => b.id - a.id); 

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Projects</h2>
      {location.pathname === '/projects' && (
        <ProjectsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          clientFilter={clientFilter}
          setClientFilter={setClientFilter}
          paymentStatusFilter={paymentStatusFilter}
          setPaymentStatusFilter={setPaymentStatusFilter}
          clients={clients}
        />
      )}

      <Routes>
        <Route path="/" element={<ProjectsList projects={currentProjects} clients={clients} onDelete={handleDeleteProject} />} />
        <Route path="new-project" element={<NewProjectForm clients={clients} onAddProject={handleAddProject} />} />
        <Route path="update/:id" element={<UpdateProjectForm clients={clients} />} />
      </Routes>

      <ProjectsPagePagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  );
};

export default ProjectsPage;