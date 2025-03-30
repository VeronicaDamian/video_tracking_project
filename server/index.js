import express from "express";
import cors from "cors";
import clientsRoutes from "./routes/clientsRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";

const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/performance", performanceRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});