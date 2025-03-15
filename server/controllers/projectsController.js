import fs from 'fs';
import path from 'path';

const projectsFilePath = path.resolve('server/db/projects.json');

export const getProjects = (req, res) => {
  fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading projects data:', err);
      res.status(500).send('Error reading projects data');
      return;
    }
    res.json(JSON.parse(data));
  });
};

export const getProjectById = (req, res) => {
  fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading projects data:', err);
      res.status(500).send('Error reading projects data');
      return;
    }
    const projects = JSON.parse(data);
    const project = projects.find(project => project.id === parseInt(req.params.id));
    if (!project) {
      res.status(404).send('Project not found');
      return;
    }
    res.json(project);
  });
};

export const createProject = (req, res) => {
  fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading projects data:', err);
      res.status(500).send('Error reading projects data');
      return;
    }
    const projects = JSON.parse(data);
    const newProject = { id: projects.length + 1, ...req.body };
    projects.push(newProject);
    fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), (err) => {
      if (err) {
        console.error('Error saving project:', err);
        res.status(500).send('Error saving project');
        return;
      }
      res.status(201).json(newProject);
    });
  });
};

export const updateProject = (req, res) => {
  fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading projects data:', err);
      res.status(500).send('Error reading projects data');
      return;
    }
    const projects = JSON.parse(data);
    const projectIndex = projects.findIndex(project => project.id === parseInt(req.params.id));
    if (projectIndex === -1) {
      res.status(404).send('Project not found');
      return;
    }
    projects[projectIndex] = { ...projects[projectIndex], ...req.body };
    fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), (err) => {
      if (err) {
        console.error('Error updating project:', err);
        res.status(500).send('Error updating project');
        return;
      }
      res.json(projects[projectIndex]);
    });
  });
};

export const deleteProject = (req, res) => {
  fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading projects data:', err);
      res.status(500).send('Error reading projects data');
      return;
    }
    let projects = JSON.parse(data);
    projects = projects.filter(project => project.id !== parseInt(req.params.id));
    fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), (err) => {
      if (err) {
        console.error('Error deleting project:', err);
        res.status(500).send('Error deleting project');
        return;
      }
      res.status(204).send();
    });
  });
};