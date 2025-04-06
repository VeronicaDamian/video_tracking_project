import * as dataService from "../services/dataService.js";

export const getProjects = async (req, res) => {
  const projects = await dataService.getProjects();
  res.json(
    projects.map((project) => {
      return project.toJSON();
    })
  );
};

export const createProject = async (req, res) => {
    const newProject = await dataService.createProject(req.body);
    res.status(201).json(newProject);

}

export const deleteProject = async (req, res) => {
    await dataService.deleteEntity("projects", req.params.id);
    res.status(204).send();
}

export const updateProject = async (req, res) => {
    const updatedProject = await dataService.updateProject(req.params.id, req.body);
    res.json(updatedProject);
}

export const getProjectById = async (req, res) => {
    const project = await dataService.getProjectById(req.params.id);
    res.json(project.toJSON());
}