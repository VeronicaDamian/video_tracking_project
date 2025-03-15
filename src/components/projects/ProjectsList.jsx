import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = ({ projects, onDelete }) => {
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Client Name</th>
          <th>Status</th>
          <th>Video Length</th>
          <th>Payment Status</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.client?.name || 'No Client'}</td>
            <td>{project.status}</td>
            <td>{project.duration} sec</td>
            <td>{project.paymentStatus}</td>
            <td>{project.tags.join(', ')}</td>
            <td>
              <Link to={`/projects/update/${project.id}`} className="btn btn-warning btn-sm me-2">
                Update
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsList;