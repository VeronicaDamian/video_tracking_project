import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProjectsList from '../components/projects/ProjectsList';
import NewProjectForm from '../components/projects/NewProjectForm';
import UpdateProjectForm from '../components/projects/UpdateProjectForm';
import ProjectsFilter from '../components/projects/ProjectsFilter';
import ProjectsPagePagination from '../components/projects/ProjectsPagePagination';
import { fetchProjects, deleteProject } from '../services/api/projectsAPI';
import { fetchClients } from '../services/api/clientsAPI';
import { useProjectContext } from '../context/ProjectContext';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const projectsPerPage = 10;
    const location = useLocation();

    // Get the project context for notifying about changes
    const { notifyProjectChange } = useProjectContext();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [projectsData, clientsData] = await Promise.all([
                    fetchProjects(),
                    fetchClients()
                ]);
                setProjects(projectsData);
                setClients(clientsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
            // Notify other components that projects have changed
            notifyProjectChange();
        } catch (error) {
            console.error('There was an error deleting the project!', error);
        }
    };

    const handleAddProject = (newProject) => {
        setProjects(prevProjects => [...prevProjects, newProject]);
        // Notify other components that projects have changed
        notifyProjectChange();
    };

    const handleUpdateProject = (updatedProject) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === updatedProject.id ? updatedProject : project
            )
        );
        // Notify other components that projects have changed
        notifyProjectChange();
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
        <div className="container py-4">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-primary text-white py-3">
                    <h2 className="text-center mb-0">Projects Dashboard</h2>
                </div>

                <div className="card-body p-4">
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

                    {isLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading projects...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </div>
                    ) : (
                        <div className="mt-4">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            {filteredProjects.length > 0 ? (
                                                <ProjectsList
                                                    projects={currentProjects}
                                                    clients={clients}
                                                    onDelete={handleDeleteProject}
                                                />
                                            ) : (
                                                <div className="alert alert-info text-center">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    No projects found matching your filters.
                                                </div>
                                            )}
                                            {totalPages > 1 && (
                                                <ProjectsPagePagination
                                                    totalPages={totalPages}
                                                    currentPage={currentPage}
                                                    handlePageChange={handlePageChange}
                                                />
                                            )}
                                        </>
                                    }
                                />
                                <Route
                                    path="new-project"
                                    element={
                                        <NewProjectForm
                                            clients={clients}
                                            onAddProject={handleAddProject}
                                        />
                                    }
                                />
                                <Route
                                    path="update/:id"
                                    element={
                                        <UpdateProjectForm
                                            clients={clients}
                                            onUpdateProject={handleUpdateProject}
                                        />
                                    }
                                />
                            </Routes>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Summary (only shown on main projects page) */}
            {location.pathname === '/projects' && !isLoading && (
                <div className="row mt-4 g-4">
                    <div className="col-md-3">
                        <div className="card bg-primary text-white shadow-sm">
                            <div className="card-body text-center">
                                <h4 className="mb-0">{projects.length}</h4>
                                <p className="mb-0">Total Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-success text-white shadow-sm">
                            <div className="card-body text-center">
                                <h4 className="mb-0">{projects.filter(p => p.status === 'Done').length}</h4>
                                <p className="mb-0">Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-warning text-dark shadow-sm">
                            <div className="card-body text-center">
                                <h4 className="mb-0">{projects.filter(p => p.status === 'In Progress').length}</h4>
                                <p className="mb-0">In Progress</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card bg-danger text-white shadow-sm">
                            <div className="card-body text-center">
                                <h4 className="mb-0">{projects.filter(p => p.paymentStatus === 'unpaid').length}</h4>
                                <p className="mb-0">Unpaid</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;