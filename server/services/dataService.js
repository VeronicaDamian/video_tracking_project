import fs from "fs";
import path from "path";
import Project from "../models/Project.js";
import Client from "../models/Client.js";
import Session from "../models/Session.js";

const DATA_PATHS = {
  clients: path.resolve("server/db/clients.json"),
  projects: path.resolve("server/db/projects.json"),
  sessions: path.resolve("server/db/sessions.json"),
};

const readFilePromise = async (filePath) => {
  const data = await fs.promises.readFile(filePath, "utf8");
  return data;
};

export const getData = async (entity) => {
  const data = await readFilePromise(DATA_PATHS[entity]);
  return JSON.parse(data);
};

export const saveData = async (entity, data) => {
  await fs.promises.writeFile(
    DATA_PATHS[entity],
    JSON.stringify(data, null, 2)
  );
  return true;
};

export const getProjects = async () => {
  const projectsData = await getData("projects");
  return projectsData.map((project) => {
    return new Project(project);
  });
};

export const getClients = async () => {
  const clientsData = await getData("clients");
  return clientsData.map((client) => {
    return new Client(client);
  });
};

export const getSessions = async () => {
  const sessionsData = await getData("session");
  return sessionsData.map((session) => {
    return new Session(session);
  });
};

export const getProjectById = async (id) => {
  const projectsData = await getData("projects");
  const project = projectsData.find((item) => item.id === parseInt(id));
  return project ? new Project(project) : null;
};

export const getClientById = async (id) => {
  const clientData = await getData("client");
  const client = clientData.find((item) => item.id === parseInt(id));
  return client ? new Client(client) : null;
};

export const getSessionById = async (id) => {
  const sessionsData = await getData("session");
  const session = sessionsData.find((item) => item.id === parseInt(id));
  return session ? new Session(session) : null;
};

export const createProject = async (projectData) => {
  const projects = await getData("projects");
  const newProject = new Project({
    id: projects.length + 1,
    ...projectData,
  });
  projects.push(newProject.toJSON());
  await saveData("projects", projects);
  return newProject.toJSON();
};

export const createClient = async (clientData) => {
  const clients = await getData("clients");
  const newClient = new Client({
    id: clients.length + 1,
    ...clientData,
  });
  clients.push(newClient.toJSON());
  await saveData("clients", clients);
  return newClient.toJSON();
};

export const createSession = async (sessionData) => {
  const sessions = await getData("sessions");
  const newSession = new Session({
    id: sessions.length + 1,
    ...sessionData,
  });
  sessions.push(newSession.toJSON());
  await saveData("sessions", sessions);
  return newSession.toJSON();
};

export const updateProject = async (id, updateData) => {
  const projectData = await getData("projects");
  const index = projectData.findIndex((item) => item.id === parseInt(id));
  const existingProject = new Project(projectData[index]);
  const updatedProject = new Project({
    ...existingProject.toJSON(),
    updateData,
  });
  projectData[index] = updatedProject.toJSON();
  await saveData("projects", projectData);
  return updateProject.toJSON();
};

export const updateClient = async (id, updateData) => {
  const data = await getData("clients");
  const index = data.findIndex((item) => item.id === parseInt(id));

  const existingClient = new Client(data[index]);
  const updatedClient = new Client({
    ...existingClient.toJSON(),
    ...updateData,
  });

  data[index] = updatedClient.toJSON();
  await saveData("clients", data);
  return updatedClient.toJSON();
};

export const updateSession = async (id, updateData) => {
  const data = await getData("sessions");
  const index = data.findIndex((item) => item.id === parseInt(id));

  const existingSession = new Session(data[index]);
  const updatedSession = new Session({
    ...existingSession.toJSON(),
    ...updateData,
  });

  data[index] = updatedSession.toJSON();
  await saveData("sessions", data);
  return updatedSession.toJSON();
};

export const deleteEntity = async (entity, id) => {
  const data = await getData(entity);
  const filteredData = data.filter((item) => item.id !== parseInt(id));
  if (data.length === filteredData.length)
    throw new Error(`${entity.slice(0, -1)} not found`);
  await saveData(entity, filteredData);
  return true;
};

export const getAllPerformanceData = async () => {
  try {
    const [projectData, clientsData, sessionData] = await Promise.all([
      readFilePromise(DATA_PATHS.projects),
      readFilePromise(DATA_PATHS.clients),
      readFilePromise(DATA_PATHS.sessions),
    ]);
    const rawProjects = JSON.parse(projectData);
    const rawClients = JSON.parse(clientsData);
    const rawSessions = JSON.parse(sessionData);

    const clients = rawClients.map((client) => {
      return new Client(client);
    });
    const sessions = rawSessions.map((session) => {
      return new Session(session);
    });
    const projects = rawProjects.map((project) => {
      if (project.client && project.client.id) {
        const clientData = clients.find(
          (client) => client.id === project.client.id
        );
        return new Project({
          ...project,
          client: clientData ? clientData.toJSON() : project.client,
        });
      }
      return new Project(project);
    });
    return {
      projects: projects.map((project) => project.toJSON()),
      clients: clients.map((client) => client.toJSON()),
      sessions: sessions.map((session) => session.toJSON()),
    };
  } catch (error) {
    console.error("Error fetching performance data: ", error);
    throw new Error(`Error fetching performance data: `);
  }
};
