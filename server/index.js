import express from "express";
import cors from "cors";
import clientsRoutes from "./routes/clientsRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";

const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});