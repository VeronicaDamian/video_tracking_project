import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const port = 5174;

app.use(cors({ origin: "*" }));
app.use(express.json());

const projectsFile = path.resolve("server", "projects.json");
const clientsFile = path.resolve("server", "clients.json");

const readProjects = () => {
  const data = fs.readFileSync(projectsFile, "utf-8");
  return JSON.parse(data);
};

const saveProjects = (projects) => {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf-8");
};

const readClients = () => {
  const data = fs.readFileSync(clientsFile, "utf-8");
  return JSON.parse(data);
};

const saveClients = (clients) => {
  fs.writeFileSync(clientsFile, JSON.stringify(clients, null, 2), "utf-8");
};

// Get all projects
app.get("/api/projects", (req, res) => {
  res.json(readProjects());
});

// Create a new project
app.post("/api/projects", (req, res) => {
  const { title, client, duration, paymentStatus = "unpaid", status = "not started", tags = [] } = req.body;

  const projects = readProjects();

  const newProject = {
    id: projects.length ? projects[projects.length - 1].id + 1 : 1,
    title,
    client,
    duration,
    paymentStatus,
    status,
    tags,
  };

  projects.push(newProject);
  saveProjects(projects);

  res.status(201).json(newProject);
});

// Delete a project
app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;

  let projects = readProjects();
  projects = projects.filter((project) => project.id !== parseInt(id));

  saveProjects(projects);

  res.status(204).end();
});

// Get a project by ID
app.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const projects = readProjects();
  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return res.status(404).send('Project not found');
  }

  res.json(project);
});

// Update a project
app.put("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, client, duration, status, paymentStatus, tags } = req.body;

  let projects = readProjects();
  const projectIndex = projects.findIndex(project => project.id === parseInt(id));

  if (projectIndex === -1) {
    return res.status(404).send('Project not found');
  }

  projects[projectIndex] = { ...projects[projectIndex], title, client, duration, status, paymentStatus, tags };
  saveProjects(projects);
  res.json(projects[projectIndex]);
});

// Get all clients
app.get("/api/clients", (req, res) => {
  res.json(readClients());
});

// Create a new client
app.post("/api/clients", (req, res) => {
  const { name, niche, paymentRate } = req.body;

  const clients = readClients();

  const newClient = {
    id: clients.length ? clients[clients.length - 1].id + 1 : 1,
    name,
    niche,
    paymentRate: parseFloat(paymentRate),
  };

  clients.push(newClient);
  saveClients(clients);

  res.status(201).json(newClient);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});